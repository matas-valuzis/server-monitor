'use strict';
module.exports = function (Model) {
    return new Promise((reolve, reject) => {
        Model.aggregate([
            {
                $group: {
                    _id: {
                        date: {
                            '$concat': [
                                {'$substr': [{ $year: '$createdAt' }, 0, -1]},
                                '-',
                                {'$substr': [{ $month: '$createdAt' }, 0, -1]},
                                '-',
                                {'$substr': [{ $dayOfMonth: '$createdAt' }, 0, -1]}
                            ]
                        },
                        server: '$server'
                    },
                    used_inodes: {
                        $avg: '$used_inodes'
                    },
                    used_space: {
                        $avg: '$used_space'
                    },
                },
            },
            {
                $project: {
                    _id: { '$concat': ['$_id.date', '$_id.server']},
                    used_inodes: { $ceil: '$used_inodes' },
                    used_space: { $ceil: '$used_space' },
                    server: '$_id.server',
                    createdAt: '$_id.date'
                }
            },
            {
                $sort: {
                    'createdAt': 1
                }
            }


        ], function(err, result) {
            if (err) {
                reject(err);
                return;
            }
            reolve(result);
        });
    });
};
