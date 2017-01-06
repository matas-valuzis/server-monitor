'use strict'

export function createUnresolvedAction(name, actionContext = {}) {
    return {
        type: name,
        unresolved: true,
        context: actionContext
    };
}

export function createUnresolvedActionMiddleware(resolverManager){
    return store => next => action => {
        if (!action.unresolved){
            return next(action);
        }
        resolverManager.resolve(action, a => store.dispatch(a));
    }
}

export default class ResolverManager {
    constructor(){
        this.resolvers = {};
        this.dependencies = {};
    }
    resolve(action, disp){
        if(typeof this.resolvers[action.type] == 'undefined'){
            throw new Error(`Resolver "${action.type}" is not registered.`);
        }
        return this.resolvers[action.type](action, disp);
    }
    registerDependcies(dep){
        Object.assign(this.dependencies, dep);
        return this;
    }
    registerResolvers(resolver){
        if (Array.isArray(resolver)){
            resolver.forEach(r => this.registerResolvers(r));
        }
        if (resolver.dependencies){
            this.resolvers[resolver.name] = this.applyDependencies(resolver.dependencies, resolver.resolver);
        }
        else{
            this.resolvers[resolver.name] = resolver.resolver;
        }
    }
    applyDependencies(deps, func){
        let scope = {};

        deps.forEach(dep => {
            if (this.dependencies[dep]){
                scope[dep] = this.dependencies[dep];
            }
            else{
                throw new Error(`Can not resolve dependency "${dep}"`);
            }
        });
        return (action, cb) => func.call(scope, action, cb);
    }
}
