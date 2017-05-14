import ServerResolver from './ServerResolvers';
import AuthResolvers from './AuthResolvers';
import ErrorResolvers from './ErrorResolvers';
import LoaderResolvers from './LoaderResolvers';
import LogResolvers from './LogResolvers';
import DiskResolvers from './DiskResolvers';
import ComputimgResolvers from './ComputingResolvers';
import KeysResolvers from './KeysResolvers';

module.exports = [
    ...AuthResolvers,
    ...ServerResolver,
    ...ErrorResolvers,
    ...LoaderResolvers,
    ...LogResolvers,
    ...DiskResolvers,
    ...ComputimgResolvers,
    ...KeysResolvers,
];