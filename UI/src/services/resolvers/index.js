import ServerResolver from './ServerResolvers';
import AuthResolvers from './AuthResolvers';
import ErrorResolvers from './ErrorResolvers';
import LoaderResolvers from './LoaderResolvers';

module.exports = [
    ...AuthResolvers,
    ...ServerResolver,
    ...ErrorResolvers,
    ...LoaderResolvers
];