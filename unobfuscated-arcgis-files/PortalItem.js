/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.26/esri/copyright.txt for details.
*/
import{_ as e}from"../chunks/tslib.es6.js";
import{getAssetUrl as t}from"../assets.js";
import i from"../core/Error.js";
import{JSONSupportMixin as r}from"../core/JSONSupport.js";
import{clone as o,fixJson as s}from"../core/lang.js";
import a from"../core/Loadable.js";
import{isSome as n,unwrapOrThrow as l}from"../core/maybe.js";
import{isDataProtocol as p,makeAbsolute as c}from"../core/urlUtils.js";
import{property as d}from"../core/accessorSupport/decorators/property.js";
import{ensureClass as u}from"../core/accessorSupport/ensureType.js";
import{reader as m}from"../core/accessorSupport/decorators/reader.js";
import{subclass as h}from"../core/accessorSupport/decorators/subclass.js";
import g from"../geometry/Extent.js";
import y from"./Portal.js";
import w from"./PortalItemResource.js";
import v from"./PortalRating.js";

var f;
const 
    b=new Set([
        "Map Service",
        "Feature Service",
        "Feature Collection",
        "Scene Service",
        "Image Service",
        "Stream Service",
        "Vector Tile Service",
        "GeoJson",
        "CSV",
        "KML",
        "WFS",
        "WMTS",
        "WMS",
        "Feed"
    ]),
    k=new Set(["KML","GeoJson","CSV"]);

let S=f=class extends(r(a)){
    static from(e){
        return u(f,e)
    }
    constructor(e){
        super(e),
        this.access=null,
        this.accessInformation=null,
        this.apiKey=null,
        this.applicationProxies=null,
        this.avgRating=null,
        this.categories=null,
        this.created=null,
        this.culture=null,
        this.description=null,
        this.extent=null,
        this.groupCategories=null,
        this.id=null,
        this.isOrgItem=!1,
        this.itemControl=null,
        this.licenseInfo=null,
        this.modified=null,
        this.name=null,
        this.numComments=null,
        this.numRatings=null,
        this.numViews=null,
        this.owner=null,
        this.ownerFolder=null,
        this.portal=null,
        this.screenshots=null,
        this.size=null,
        this.snippet=null,
        this.sourceJSON=null,
        this.sourceUrl=null,
        this.spatialReference=null,
        this.tags=null,
        this.title=null,
        this.type=null,
        this.typeKeywords=null,
        this.url=null
    }
    destroy(){
        this.portal=null
    }
    get displayName(){
        const e=this.type,
        t=this.typeKeywords||[];
        let i=e;
        return"Feature Service"===e||"Feature Collection"===e?i=t.includes("Table")?"Table":t.includes("Route Layer")?"Route Layer":t.includes("Markup")?"Markup":"Feature Layer":"Image Service"===e?i=t.includes("Elevation 3D Layer")?"Elevation Layer":t.includes("Tiled Imagery")?"Tiled Imagery Layer":"Imagery Layer":"Scene Service"===e?i="Scene Layer":"Video Service"===e?i="Video Layer":"Scene Package"===e?i="Scene Layer Package":"Stream Service"===e?i="Feature Layer":"Geoprocessing Service"===e&&this.portal&&this.portal.isPortal?i=t.includes("Web Tool")?"Tool":"Geoprocessing Service":"Geocoding Service"===e?i="Locator":"Geoenrichment Service"===e?i="GeoEnrichment Service":"Microsoft Powerpoint"===e?i="Microsoft PowerPoint":"GeoJson"===e?i="GeoJSON":"Globe Service"===e?i="Globe Layer":"Vector Tile Service"===e?i="Tile Layer":"netCDF"===e?i="NetCDF":"Map Service"===e?i=t.includes("Spatiotemporal")||!t.includes("Hosted Service")&&!t.includes("Tiled")||t.includes("Relational")?"Map Image Layer":"Tile Layer":e&&e.toLowerCase().includes("add in")?i=e.replace(/(add in)/gi,"Add-In"):"datastore catalog service"===e?i="Big Data File Share":"Compact Tile Package"===e?i="Tile Package (tpkx)":"OGCFeatureServer"===e?i="OGC Feature Layer":"web mapping application"===e&&t.includes("configurableApp")?i="Instant App":"Insights Page"===e&&(i="Insights Report"),i
    }
    readExtent(e){
        return e&&e.length?new g(e[0][0],e[0][1],e[1][0],e[1][1]):null
    }
    get iconUrl(){
        const 
            e=this.type&&this.type.toLowerCase()||"",
            i=this.typeKeywords||[],
            r="esri/images/portal/",
            o="16";
        let 
            s,
            a=!1,
            n=!1,
            l=!1,
            p=!1,
            c=!1,
            d=!1;
        return e.indexOf("service")>0||
            "feature collection"===e||
            "kml"===e||
            "wms"===e||
            "wmts"===e||
            "wfs"===e?(
                a=i.includes("Hosted Service"),
                "feature service"===e||
                "feature collection"===e||
                "kml"===e||
                "wfs"===e?(
                    n=i.includes("Table"),
                    l=i.includes("Route Layer"),
                    p=i.includes("Markup"),
                    c=i.includes("Spatiotemporal"),
                    d=i.includes("UtilityNetwork"),
                    s=c&&
                        n?"spatiotemporaltable":
                        n?"table":
                        l?"routelayer":
                        p?"markup":
                        c?"spatiotemporal":
                        a?"featureshosted":
                        d?"utilitynetwork":"features"
                ):
                s="map service"===e||
                "wms"===e||
                "wmts"===e?a||
                i.includes("Tiled")||
                "wmts"===e
                ?"maptiles":"mapimages":"scene service"===e
                ?i.includes("Line")
                ?"sceneweblayerline":i.includes("3DObject")
                ?"sceneweblayermultipatch":i.includes("Point")
                ?"sceneweblayerpoint":i.includes("IntegratedMesh")
                ?"sceneweblayermesh":i.includes("PointCloud")
                ?"sceneweblayerpointcloud":i.includes("Polygon")
                ?"sceneweblayerpolygon":i.includes("Building")
                ?"sceneweblayerbuilding":i.includes("Voxel")?"sceneweblayervoxel":"sceneweblayer":"image service"===e
                ?i.includes("Elevation 3D Layer")
                ?"elevationlayer":i.includes("Tiled Imagery")
                ?"tiledimagerylayer":"imagery":"stream service"===e
                ?"streamlayer":"video service"===e?"mediaservice":"vector tile service"===e
                ?"vectortile":"datastore catalog service"===e
                ?"datastorecollection":"geocoding service"===e
                ?"geocodeservice":"geoprocessing service"===e
                ?i.includes("Web Tool")&&this.portal&&this.portal.isPortal
                ?"tool":"layers":"geodata service"===e
                ?"geodataservice":"layers"
            ):s="web map"===e||
            "cityengine web scene"===e?"maps":"web scene"===e?i.includes("ViewingMode-Local")
            ?"webscenelocal":"websceneglobal":"web mapping application"===e&&
            i.includes("configurableApp")
            ?"instantapps":"web mapping application"===e||
            "mobile application"===e||
            "application"===e||
            "operation view"===e||
            "desktop application"===e?"apps":"map document"===e||
            "map package"===e||"published map"===e||
            "scene document"===e||
            "globe document"===e||
            "basemap package"===e||
            "mobile basemap package"===e||
            "mobile map package"===e||
            "project package"===e||
            "project template"===e||
            "pro map"===e||
            "layout"===e||
            "layer"===e&&
            i.includes("ArcGIS Pro")||
                "explorer map"===e&&
            i.indexOf("Explorer Document")?"mapsgray":"service definition"===e||
            "csv"===e||"shapefile"===e||
            "cad drawing"===e||
            "geojson"===e||
            "360 vr experience"===e||
            "netcdf"===e||
            "administrative report"===e?"datafiles":"explorer add in"===e||
            "desktop add in"===e||
            "windows viewer add in"===e||
            "windows viewer configuration"===e?"appsgray":"arcgis pro add in"===e||
            "arcgis pro configuration"===e?"addindesktop":"rule package"===e||
            "file geodatabase"===e||"sqlite geodatabase"===e||
            "csv collection"===e||
            "kml collection"===e||
            "windows mobile package"===e||
            "map template"===e||
            "desktop application template"===e||
            "gml"===e||
            "arcpad package"===e||
            "code sample"===e||
            "form"===e||
            "document link"===e||
            "earth configuration"===e||
            "operations dashboard add in"===e||
            "rules package"===e||
            "image"===e||"workflow manager package"===e||
            "explorer map"===e&&
            i.includes("Explorer Mapping Application")||
            i.includes("Document")?"datafilesgray":"network analysis service"===e||
            "geoprocessing service"===e||
            "geodata service"===e||
            "geometry service"===e||
            "geoprocessing package"===e||
            "locator package"===e||
            "geoprocessing sample"===e||
            "workflow manager service"===e
            ?"toolsgray":"layer"===e||
            "layer package"===e||
            "explorer layer"===e
            ?"layersgray":"scene package"===e
            ?"scenepackage":"mobile scene package"===e
            ?"mobilescenepackage":"tile package"===e||
            "compact tile package"===e
            ?"tilepackage":"task file"===e
            ?"taskfile":"report template"===e
            ?"report-template":"statistical data collection"===e
            ?"statisticaldatacollection":"insights workbook"===e
            ?"workbook":"insights model"===e
            ?"insightsmodel":"insights page"===e
            ?"insightspage":"insights theme"===e
            ?"insightstheme":"hub initiative"===e
            ?"hubinitiative":"hubpage"===e
            ?"hubpage":"hub event"===e
            ?"hubevent":"hub site application"===e
            ?"hubsite":"hub project"===e
            ?"hubproject":"relational database connection"===e
            ?"relationaldatabaseconnection":"big data file share"===e
            ?"datastorecollection":"image collection"===e
            ?"imagecollection":"style"===e
            ?"style":"desktop style"===e
            ?"desktopstyle":"dashboard"===e
            ?"dashboard":"raster function template"===e
            ?"rasterprocessingtemplate":"vector tile package"===e
            ?"vectortilepackage":"ortho mapping project"===e
            ?"orthomappingproject":"ortho mapping template"===e
            ?"orthomappingtemplate":"solution"===e
            ?"solutions":"geopackage"===e
            ?"geopackage":"deep learning package"===e
            ?"deeplearningpackage":"real time analytic"===e
            ?"realtimeanalytics":"big data analytic"===e
            ?"bigdataanalytics":"feed"===e
            ?"feed":"excalibur imagery project"===e
            ?"excaliburimageryproject":"notebook"===e
            ?"notebook":"storymap"===e
            ?"storymap":"survey123 add in"===e
            ?"survey123addin":"mission"===e
            ?"mission":"mission report"===e
            ?"missionreport":"quickcapture project"===e
            ?"quickcaptureproject":"pro report"===e?"proreport":"pro report template"===e
            ?"proreporttemplate":"urban model"===e?"urbanmodel":"web experience"===e
            ?"experiencebuilder":"web experience template"===e?"webexperiencetemplate":"experience builder widget"===e
            ?"experiencebuilderwidget":"experience builder widget package"===e
            ?"experiencebuilderwidgetpackage":"workflow"===e?"workflow":"insights script"===e
            ?"insightsscript":"kernel gateway connection"===e?"kernelgatewayconnection":"hub initiative template"===e
            ?"hubinitiativetemplate":"storymap theme"===e?"storymaptheme":"knowledge graph"===e
            ?"knowledgegraph":"native application"===e?"nativeapp":"native application installer"===e
            ?"nativeappinstaller":"link chart"===e?"linkchart":"investigation"===e
            ?"investigation":"ogcfeatureserver"===e?"features":"pro project"===e
            ?"proproject":"insights workbook package"===e?"insightsworkbookpackage":"apache parquet"===e
            ?"apacheparquet":"notebook code snippets"===e||"notebook code snippet library"===e
            ?"notebookcodesnippets":"suitability model"===e
            ?"suitabilitymodel":"esri classifier definition"===e
            ?"classifierdefinition":"esri classification schema"===e
            ?"classificationschema":"insights data engineering workbook"===e
            ?"dataengineeringworkbook":"insights data engineering model"===e
            ?"dataengineeringmodel":"deep learning studio project"===e
            ?"deeplearningproject":"discussion"===e?"discussion":"allsource project"===e
            ?"allsourceproject":"api key"===e?"apikey":"maps",
        s?t(r+s+o+".png"):null
    }
    get isLayer(){
        return null!=this.type&&b.has(this.type)
    }
    get itemPageUrl(){const e=this.portal?.itemPageUrl;
        return e&&this.id?`${e}?id=${this.id}`:null
    }
    get itemUrl(){
        const e=this.portal?.restUrl;
        return e&&this.id?`${e}/content/items/${this.id}`:null
    }
    get thumbnailUrl(){
        const e=this.itemUrl,t=this.thumbnail;
        return e&&t?this.portal?.normalizeUrl(`${e}/info/${t}?f=json`)??null:null
    }
    get userItemUrl(){
        const e=this.get("portal.restUrl");
        if(!e)return null;const t=this.owner||this.get("portal.user.username");
        if(!t)return null;
        return`${e}/content/users/${this.ownerFolder?`${t}/${this.ownerFolder}`:t}/items/${this.id}`
    }
    load(e){
        const t=this.portal??(this.portal=y.getDefault()),i=t.load(e).then((()=>this.sourceJSON?this.sourceJSON:this.id&&this.itemUrl?t.request(this.itemUrl,{signal:n(e)?e.signal:null,query:{token:this.apiKey}}):{})).then((e=>{this.sourceJSON=e,this.read(e)}));
        return this.addResolvingPromise(i),Promise.resolve(this)
    }
    async addRating(e){
        const t={method:"post",query:{}};
        return e instanceof v&&(e=e.rating),null==e||isNaN(e)||"number"!=typeof e||(t.query.rating=e),this.portal?(await this.portal.request(this.itemUrl+"/addRating",t),new v({rating:e,created:new Date})):null
    }
    clone(){
        const e={
            access:this.access,
            accessInformation:this.accessInformation,
            applicationProxies:o(this.applicationProxies),
            avgRating:this.avgRating,
            categories:o(this.categories),
            created:o(this.created),
            culture:this.culture,
            description:this.description,extent:o(this.extent),
            groupCategories:o(this.groupCategories),
            id:this.id,itemControl:this.itemControl,
            licenseInfo:this.licenseInfo,
            modified:o(this.modified),
            name:this.name,numComments:this.numComments,
            numRatings:this.numRatings,
            numViews:this.numViews,
            owner:this.owner,
            ownerFolder:this.ownerFolder,
            portal:this.portal,
            screenshots:o(this.screenshots),
            size:this.size,
            snippet:this.snippet,
            sourceUrl:this.sourceUrl,
            spatialReference:this.spatialReference,
            tags:o(this.tags),
            thumbnail:this.thumbnail,
            title:this.title,
            type:this.type,
            typeKeywords:o(this.typeKeywords),
            url:this.url
        };
        this.loaded&&(e.loadStatus="loaded");
        const t=new f({sourceJSON:this.sourceJSON}).set(e);
        return t._set("isOrgItem",this.isOrgItem),t
    }
    createPostQuery(){
        const e=this.toJSON();
        for(const i of ["tags","typeKeywords","categories"])
            e[i]&&(e[i]=e[i].join(", "));
        const{extent:t}=e;
        return t&&(e.extent=JSON.stringify(t)),e
    }
    async deleteRating(){
        await l(this.portal).request(this.itemUrl+"/deleteRating",{method:"post"})
    }
    fetchData(e="json",t){
        return l(this.portal)
            .request(this.itemUrl+"/data",{
                responseType:e,...t,
                query:{token:this.apiKey}
            })
    }
    async fetchRating(e){
        const t=await l(this.portal)
            .request(this.itemUrl+"/rating",{query:{token:this.apiKey},...e});
        return null!=t.rating?(t.created=new Date(t.created),new v(t)):null
    }
    fetchRelatedItems(e,t){
        return l(this.portal).requestToTypedArray(this.itemUrl+"/relatedItems",{query:{...e,token:this.apiKey},...t},f)
    }
    getThumbnailUrl(e){let t=this.thumbnailUrl;
        return t&&e&&(t+=`&w=${e}`),t
    }
    reload(){
        return l(this.portal).request(this.itemUrl??"",{cacheBust:!0,query:{token:this.apiKey}}).then((e=>(this.sourceJSON=e,this.read(e),this)))
    }
    update(e){
        return this.id?this.load()
        .then((()=>l(this.portal).signIn()))
        .then((()=>{
            const t=e&&e.data,i={method:"post"};
            i.query=this.createPostQuery();
            for(const e in i.query)
                null===i.query[e]&&(i.query[e]="");
            return i.query.clearEmptyFields=!0,
                null!=t&&(
                    "string"==typeof t
                    ?i.query.text=t:"object"==typeof t&&(i.query.text=JSON.stringify(t))
                ),
                this.portal.request(`${this.userItemUrl}/update`,i)
                .then((()=>this.reload()))
        })):
        Promise.reject(new i("portal:item-does-not-exist","The item does not exist yet and cannot be updated"))
    }
    async copy(e){
        if(!this.id)throw new i("portal:item-does-not-exist","The item does not exist yet");
        await this.load();
        const{portal:t,itemUrl:r}=this;
        await l(t).signIn();
        const{copyResources:o,folder:s,tags:a,title:n}=e||{},
        p={
            method:"post",
            query:{
                copyPrivateResources:"all"===o,
                folder:"string"==typeof s?s:s?.id,
                includeResources:!!o,tags:a?.join(","),title:n
            }
        },
        {itemId:c}=await t.request(`${r}/copy`,p);
        return new f({id:c,portal:t})
    }
    updateThumbnail(e){
        return this.id?this.load().then((()=>this.portal.signIn())).then((()=>{const t=e.thumbnail,i=e.filename,r={method:"post"};
        if("string"==typeof t)
            p(t)?r.query={data:t}:r.query={url:c(t)},n(i)&&(r.query.filename=i);
        else{
            const e=new FormData;
            n(i)?e.append("file",t,i):e.append("file",t),r.body=e
        }
        return this.portal.request(`${this.userItemUrl}/updateThumbnail`,r).then((()=>this.reload()))})):Promise.reject(new i("portal:item-does-not-exist","The item does not exist yet and cannot be updated"))
    }
    async fetchResources(e={},t){
        return(await import("./support/resourceUtils.js")).fetchResources(this,e,t)
    }
    async addResource(e,t,i){
        const r=await import("./support/resourceUtils.js");
        return e.portalItem=this,r.addOrUpdateResource(e,"add",t,i)
    }
    async removeResource(e,t){const r=await import("./support/resourceUtils.js");
        if(e.portalItem&&e.portalItem.itemUrl!==this.itemUrl)throw new i("removeresource:portal-item-mismatch","The portal item associated with the provided resource does not match the item");
        return r.removeResource(this,e,t)
    }
    async removeAllResources(e){
        return(await import("./support/resourceUtils.js")).removeAllResources(this,e)
    }
    resourceFromPath(e){
        return new w({portalItem:this,path:e})
    }
    toJSON(){
        const e=this.extent,
            t={
                accessInformation:this.accessInformation,
                categories:o(this.categories),
                created:this.created&&this.created.getTime(),
                description:this.description,
                extent:e&&[[e.xmin,e.ymin],[e.xmax,e.ymax]],
                id:this.id,isOrgItem:this.isOrgItem,
                licenseInfo:this.licenseInfo,
                modified:this.modified&&this.modified.getTime(),
                name:this.name,owner:this.owner,
                ownerFolder:this.ownerFolder,
                snippet:this.snippet,
                sourceUrl:this.sourceUrl,
                spatialReference:this.spatialReference,
                tags:o(this.tags),
                thumbnail:this.thumbnail,
                title:this.title,
                type:this.type,
                typeKeywords:o(this.typeKeywords),
                url:this.url
            };
        return s(t)
    }
    static fromJSON(e){
        if(!e)return null;
        if(e.declaredClass)throw new Error("JSON object is already hydrated");
        return new f({sourceJSON:e})
    }
    _getPostQuery(){
        const e=this.toJSON();
        for(const t in e)
            "tags"===t&&null!==e[t]&&(e[t]=e[t].join(", ")),
            "typeKeywords"===t&&null!==e[t]&&(e[t]=e[t].join(", ")),
            "extent"===t&&e[t]&&(e[t]=JSON.stringify(e[t]));
        return e
    }
};

e([d({type:["private","shared","org","public"]})],S.prototype,"access",void 0),
e([d()],S.prototype,"accessInformation",void 0),
e([d({type:String})],S.prototype,"apiKey",void 0),
e([d({json:{read:{source:"appProxies"}}})],S.prototype,"applicationProxies",void 0),
e([d()],S.prototype,"avgRating",void 0),
e([d()],S.prototype,"categories",void 0),
e([d({type:Date})],S.prototype,"created",void 0),
e([d()],S.prototype,"culture",void 0),
e([d()],S.prototype,"description",void 0),
e([d({readOnly:!0})],S.prototype,"displayName",null),
e([d({type:g})],S.prototype,"extent",void 0),
e([m("extent")],S.prototype,"readExtent",null),
e([d()],S.prototype,"groupCategories",void 0),
e([d({readOnly:!0})],S.prototype,"iconUrl",null),
e([d()],S.prototype,"id",void 0),
e([d({readOnly:!0})],S.prototype,"isLayer",null),
e([d({type:Boolean,readOnly:!0})],S.prototype,"isOrgItem",void 0),
e([d()],S.prototype,"itemControl",void 0),
e([d({readOnly:!0})],S.prototype,"itemPageUrl",null),
e([d({readOnly:!0})],S.prototype,"itemUrl",null),
e([d()],S.prototype,"licenseInfo",void 0),
e([d({type:Date})],S.prototype,"modified",void 0),
e([d()],S.prototype,"name",void 0),
e([d()],S.prototype,"numComments",void 0),
e([d()],S.prototype,"numRatings",void 0),
e([d()],S.prototype,"numViews",void 0),
e([d()],S.prototype,"owner",void 0),
e([d()],S.prototype,"ownerFolder",void 0),
e([d({type:y})],S.prototype,"portal",void 0),
e([d()],S.prototype,"screenshots",void 0),
e([d()],S.prototype,"size",void 0),
e([d()],S.prototype,"snippet",void 0),
e([d()],S.prototype,"sourceJSON",void 0),
e([d({type:String})],S.prototype,"sourceUrl",void 0),
e([d({type:String})],S.prototype,"spatialReference",void 0),
e([d()],S.prototype,"tags",void 0),
e([d()],S.prototype,"thumbnail",void 0),
e([d({readOnly:!0})],S.prototype,"thumbnailUrl",null),
e([d()],S.prototype,"title",void 0),
e([d()],S.prototype,"type",void 0),
e([d()],S.prototype,"typeKeywords",void 0),
e([d({
    type:String,json:{
        read(e,t){
            if(k.has(t.type)){
                const t=this.portal?.restUrl;
                e||(e=t&&this.id?`${t}/content/items/${this.id}/data`:null)
            }
            return e
        }
    }
})],S.prototype,"url",void 0),
e([d({readOnly:!0})],S.prototype,"userItemUrl",null),S=f=e([h("esri.portal.PortalItem")],S);

const x=S;
export{x as default};