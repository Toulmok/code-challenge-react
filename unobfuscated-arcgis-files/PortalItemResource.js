/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{_ as t}from"../chunks/tslib.es6.js";
import r from"../core/Accessor.js";
import e from"../core/Error.js";
import o from"../core/Logger.js";
import{isSome as s,isNone as a,get as p}from"../core/maybe.js";
import{isAbsolute as l,makeRelative as i}from"../core/urlUtils.js";
import{property as c}from"../core/accessorSupport/decorators/property.js";
import{cast as m}from"../core/accessorSupport/decorators/cast.js";
import"../core/arrayUtils.js";
import{subclass as u}from"../core/accessorSupport/decorators/subclass.js";

let h=class extends r{
    constructor(t){
        super(t),this.portalItem=null
    }
    normalizeCtorArgs(t){
        return t&&t.portalItem&&t.path?{...t,path:this._normalizePath(t.path,t.portalItem)}:t
    }
    set path(t){
        s(t)&&l(t)?o.getLogger(this.declaredClass).error("portalitemresource:invalid-path","A portal item resource path must be relative"):this._set("path",t)
    }
    _castPath(t){
        return this._normalizePath(t,this.portalItem)
    }
    get url(){
        return this.portalItem&&this.path?`${this.portalItem.itemUrl}/resources/${this.path}`:null
    }
    get itemRelativeUrl(){
        return this.portalItem&&this.path?`./resources/${this.path}`:null
    }
    fetch(t="json",r){
        const o=this.url;
        if(a(o))throw new e("portal-item-resource:fetch","Portal item resource does not refer to a valid item or path");
        return this.portalItem.portal.request(o,{responseType:t,query:{token:this.portalItem.apiKey},signal:p(r,"signal")})
    }
    async update(t,r){
        return(await import("./support/resourceUtils.js")).addOrUpdateResource(this,"update",t,r)
    }
    hasPath(){
        return s(this.path)
    }
    _normalizePath(t,r){
        return a(t)?t:(t=t.replace(/^\/+/,""),s(r)&&l(t)&&(t=i(t,r.itemUrl)),t?.replace(/^\/+/,"").replace(/^(\.\/)?resources\//,""))
    }
};
t([c()],h.prototype,"portalItem",void 0),
t([c({type:String,value:null})],h.prototype,"path",null),
t([m("path")],h.prototype,"_castPath",null),
t([c({type:String,readOnly:!0})],h.prototype,"url",null),
t([c({type:String,readOnly:!0})],h.prototype,"itemRelativeUrl",null),h=t([u("esri.portal.PortalItemResource")],h);
const n=h;export{n as default};