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
                    used_cpu: {
                        $avg: '$used_cpu'
                    },
                    used_ram: {
                        $avg: '$used_ram'
                    },
                    tasks: {
                        $avg: '$tasks'
                    },
                },
            },
            {
                $project: {
                    _id: { '$concat': ['$_id.date', '$_id.server']},
                    used_cpu: '$used_cpu',
                    used_ram: { $ceil: '$used_ram' },
                    tasks: { $ceil: '$tasks' },
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
