import ServerResolver from './ServerResolvers';
import AuthResolvers from './AuthResolvers';

module.exports = [
    ...AuthResolvers,
    ...ServerResolver
];