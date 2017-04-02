import ServerResolver from './ServerResolvers';
import AuthResolvers from './AuthResolvers';
import ErrorResolvers from './ErrorResolvers';
import LoaderResolvers from './LoaderResolvers';
import LogResolvers from './LogResolvers';

module.exports = [
    ...AuthResolvers,
    ...ServerResolver,
    ...ErrorResolvers,
    ...LoaderResolvers,
    ...LogResolvers
];