(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{231:function(e,t,a){e.exports=a(427)},425:function(e,t,a){},427:function(e,t,a){"use strict";a.r(t);var n=a(0),o=a.n(n),r=a(28),i=a.n(r),c=a(11),s=a(12),l=a(14),m=a(13),u=a(15),d=a(8),h=a(3),p=a(430),g=a(431),b=a(428),f=a(127),v=a(7),O=a(170),j=a.n(O),E=a(16),y=a.n(E),k=a(30),w=a.n(k),C=a(74),x=a.n(C),S=a(96),N=a.n(S),I=a(44),L=a.n(I),U=a(57),T=a.n(U);a(133);T.a.initializeApp({apiKey:"AIzaSyBksOWJ2QuRGZFx6-5-Ajbls0RAfUwmq7I",authDomain:"aaphotography-b504f.firebaseapp.com",databaseURL:"https://aaphotography-b504f.firebaseio.com",projectId:"aaphotography-b504f",storageBucket:"aaphotography-b504f.appspot.com",messagingSenderId:"815652919811"});T.a.firestore().settings({timestampsInSnapshots:!0});var D=a(73),F=a.n(D)()("B2F2ETSVIP","c9eb9f0c90e7bc419ee551b15652312e"),P="blog_posts";var R=a(26),A=a.n(R),W=a(27),B=a.n(W),G=a(90),z=a.n(G),M=a(93),V=a.n(M),H=a(92),_=a.n(H),q=a(91),J=a.n(q),K=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(l.a)(this,Object(m.a)(t).call(this,e))).state={open:!1,title:"",content:"",avatarUrl:"",imageUrl:"",linkUrl:"",homepageUrl:"",date:T.a.firestore.Timestamp.now(),commentsCounter:0,likes:0},a.handleAddPost=a.handleAddPost.bind(Object(d.a)(Object(d.a)(a))),a.handleClickOpen=a.handleClickOpen.bind(Object(d.a)(Object(d.a)(a))),a.handleClose=a.handleClose.bind(Object(d.a)(Object(d.a)(a))),a}return Object(u.a)(t,e),Object(s.a)(t,[{key:"handleClickOpen",value:function(){this.setState({open:!0})}},{key:"handleClose",value:function(){this.setState({open:!1})}},{key:"handleAddPost",value:function(){var e=this.state,t={title:e.title,content:e.content,avatarUrl:e.avatarUrl,imageUrl:e.imageUrl,linkUrl:e.linkUrl,homepageUrl:e.homepageUrl,date:e.date,commentsCounter:e.commentsCounter};T.a.firestore().collection("blog").add(t).then(function(e){delete t.commentsCounter,delete t.likes,t.date=t.date.toDate().getTime(),t.objectID=e.id,function(e){F.initIndex(P).addObject(e,function(e,t){e&&console.log(e),console.log(t)})}(t)}),this.setState({open:!1})}},{key:"render",value:function(){var e=this,t=this.props.classes;return o.a.createElement("div",{className:t.root},o.a.createElement(A.a,{className:t.button,"aria-label":"Add post",onClick:this.handleClickOpen},o.a.createElement("i",{className:"material-icons"},"library_add")),o.a.createElement(z.a,{open:this.state.open,onClose:this.handleClose,"aria-labelledby":"form-dialog-title"},o.a.createElement(J.a,{id:"form-dialog-title"},"Article:"),o.a.createElement(_.a,null,o.a.createElement(B.a,{autoFocus:!0,margin:"dense",id:"name",label:"title",type:"string",fullWidth:!0,onChange:function(t){return e.setState({title:t.target.value})}}),o.a.createElement(B.a,{margin:"dense",id:"name",label:"content",type:"string",fullWidth:!0,onChange:function(t){return e.setState({content:t.target.value})}}),o.a.createElement(B.a,{margin:"dense",id:"name",label:"avatarUrl",type:"url",fullWidth:!0,onChange:function(t){return e.setState({avatarUrl:t.target.value})}}),o.a.createElement(B.a,{margin:"dense",id:"name",label:"imageUrl",type:"url",fullWidth:!0,onChange:function(t){return e.setState({imageUrl:t.target.value})}}),o.a.createElement(B.a,{margin:"dense",id:"name",label:"linkUrl",type:"url",fullWidth:!0,onChange:function(t){return e.setState({linkUrl:t.target.value})}}),o.a.createElement(B.a,{margin:"dense",id:"name",label:"homepageUrl",type:"url",fullWidth:!0,onChange:function(t){return e.setState({homepageUrl:t.target.value})}})),o.a.createElement(V.a,null,o.a.createElement(A.a,{onClick:this.handleClose,color:"primary"},"Cancel"),o.a.createElement(A.a,{onClick:this.handleAddPost,color:"primary"},"Publish"))))}}]),t}(o.a.Component),Q=Object(v.withStyles)(function(e){return{button:{margin:e.spacing.unit,color:"grey"},userName:{display:"inline"}}})(K),Z=a(52),$=a.n(Z),X=a(53),Y=a.n(X),ee=a(24),te=a.n(ee),ae=function(e){function t(){var e,a;Object(c.a)(this,t);for(var n=arguments.length,o=new Array(n),r=0;r<n;r++)o[r]=arguments[r];return(a=Object(l.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(o)))).state={anchorEl:null},a.handleMenu=function(e){a.setState({anchorEl:e.currentTarget})},a.handleClose=function(){a.setState({anchorEl:null})},a}return Object(u.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e=this.props.classes;return o.a.createElement("div",{className:e.root},o.a.createElement($.a,{position:"static",className:e.appbar},o.a.createElement(Y.a,null,o.a.createElement(te.a,{variant:"h4",align:"center",className:e.logo},"AA Photography"),o.a.createElement(Ct.Consumer,null,function(t){return t&&"admin"===t.role?o.a.createElement("div",{className:e.adminTools},o.a.createElement(Q,null)):null}),this.props.children)))}}]),t}(o.a.Component),ne=N()(Object(v.withStyles)(function(e){var t,a;return{root:{flexGrow:1},appbar:{boxShadow:"none",backgroundColor:"white",borderBottom:"1px #dbdbdb solid"},logo:(t={},Object(h.a)(t,e.breakpoints.down("xs"),{textAlign:"left",fontSize:20}),Object(h.a)(t,"flexGrow",1),Object(h.a)(t,"fontFamily","Abril Fatface, cursive"),Object(h.a)(t,"color","grey"),t),adminTools:(a={},Object(h.a)(a,e.breakpoints.down("xs"),{marginLeft:"62.5%"}),Object(h.a)(a,"position","absolute"),Object(h.a)(a,"marginLeft","78%"),a)}}),L()())(ae),oe=a(6),re=a.n(oe),ie=a(429),ce=a(432),se=function(e){function t(){return Object(c.a)(this,t),Object(l.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e=this.props,t=e.classes,a=e.to,n=e.location,r=e.buttonName;return o.a.createElement(b.a,{path:a,children:function(e){var i=e.match;return o.a.createElement(ie.a,{type:"button",replace:i===n.pathname,to:a,style:{textDecoration:"none"}},o.a.createElement(A.a,{className:t.buttons},r))}})}}]),t}(o.a.Component),le=Object(ce.a)(se),me=Object(v.withStyles)(function(e){var t;return{buttons:(t={},Object(h.a)(t,e.breakpoints.down("xs"),{color:"white"}),Object(h.a)(t,"borderRadius","0px"),Object(h.a)(t,"padding",0),Object(h.a)(t,"fontSize",14),Object(h.a)(t,"textTransform","uppercase"),Object(h.a)(t,"color","grey"),Object(h.a)(t,"minWidth",63),Object(h.a)(t,"fontFamily","Pompiere, cursive"),Object(h.a)(t,"transition","transform .3s ease-in-out"),Object(h.a)(t,"&:hover",{backgroundColor:"rgb(242, 242, 242, 0)",transform:"scale(1.4)"}),t)}})(le),ue=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(l.a)(this,Object(m.a)(t).call(this,e))).rootEl=o.a.createRef(),a.barEl=o.a.createRef(),a.initialPosition={},a.state={isFixed:!1},a.handleScroll=a.handleScroll.bind(Object(d.a)(Object(d.a)(a))),a}return Object(u.a)(t,e),Object(s.a)(t,[{key:"handleScroll",value:function(){var e=this.rootEl.current,t=this.barEl.current,a=e.getBoundingClientRect(),n=t.classList.contains(this.props.classes.fixedOpen);!n&&a.bottom<=0?this.setState({isFixed:!0}):n&&a.bottom>=this.initialPosition.top&&this.setState({isFixed:!1})}},{key:"componentDidMount",value:function(){var e=this.rootEl.current;this.initialPosition=e.getBoundingClientRect(),window.addEventListener("scroll",this.handleScroll)}},{key:"componentWillUnmount",value:function(){window.removeEventListener("scroll",this.handleScroll)}},{key:"render",value:function(){var e=this.props.classes,t=this.state.isFixed;return o.a.createElement("div",{className:e.root,ref:this.rootEl},o.a.createElement("div",{className:re()(e.fixed,Object(h.a)({},e.fixedOpen,t)),ref:this.barEl},o.a.createElement($.a,{position:"static",className:e.appbar},o.a.createElement(Y.a,{className:e.toolbar},o.a.createElement(me,{to:"/main",buttonName:"Home"}),o.a.createElement(me,{to:"/blog",buttonName:"Blog"}),o.a.createElement(me,{to:"/gallery",buttonName:"Gallery"}),o.a.createElement(me,{to:"/about",buttonName:"About"})))))}}]),t}(o.a.Component),de=N()(Object(v.withStyles)(function(e){return{root:{height:45},fixed:{top:-45},fixedOpen:{position:"fixed",width:"100%",opacity:.7,zIndex:1,"&:hover":{opacity:1},transition:"all .4s ease-in-out",top:0},appbar:{boxShadow:"none",backgroundColor:"white"},toolbar:{marginLeft:"auto",marginRight:"auto",minHeight:45,height:45,padding:0}}}),L()())(ue),he=a(94),pe=a.n(he),ge=a(72),be=a.n(ge),fe=function(e){function t(){var e,a;Object(c.a)(this,t);for(var n=arguments.length,o=new Array(n),r=0;r<n;r++)o[r]=arguments[r];return(a=Object(l.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(o)))).state={top:!1},a.toggleDrawer=function(e,t){return function(){a.setState(Object(h.a)({},e,t))}},a}return Object(u.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e=this.props.classes,t=o.a.createElement(be.a,{className:e.fullList},o.a.createElement(me,{to:"/main",buttonName:"Home"}),o.a.createElement(me,{to:"/blog",buttonName:"Blog"}),o.a.createElement(me,{to:"/gallery",buttonName:"Gallery"}),o.a.createElement(me,{to:"/about",buttonName:"About"}));return o.a.createElement(o.a.Fragment,null,o.a.createElement(A.a,{className:e.menuButton,onClick:this.toggleDrawer("top",!0)},o.a.createElement("i",{className:"material-icons",style:{color:"grey"}},"menu")),o.a.createElement(pe.a,{anchor:"top",open:this.state.top,onClose:this.toggleDrawer("top",!1)},o.a.createElement("div",{tabIndex:0,role:"button",onClick:this.toggleDrawer("top",!1),onKeyDown:this.toggleDrawer("top",!1)},t)))}}]),t}(o.a.Component),ve=Object(v.withStyles)({fullList:{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",minWidth:200,backgroundColor:"grey"},menuButton:{minWidth:60}})(fe),Oe=a(25),je=a.n(Oe),Ee=a(34),ye=a.n(Ee),ke=a(95),we=a.n(ke);var Ce=function(){return new Promise(function(e,t){var a=[];T.a.firestore().collection("images").get().then(function(n){n.empty&&t("Firestore: Snapshot is empty"),n.forEach(function(e){var t=e.data();a.push({id:t.id,name:t.name,url:t.url,thumbUrl:t.thumbUrl,category:t.category,description:t.description})}),e(a)})})},xe=function(e){var t=!1;return{promise:new Promise(function(a,n){e.then(function(e){return t?n({isCanceled:!0}):a(e)},function(e){return n(t?{isCanceled:!0}:e)})}),cancel:function(){t=!0}}},Se=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(l.a)(this,Object(m.a)(t).call(this,e))).fetchImages=xe(Ce()),a.state={imageUrl:"",showImage:!1,loading:!0},a.handleOnLoad=a.handleOnLoad.bind(Object(d.a)(Object(d.a)(a))),a}return Object(u.a)(t,e),Object(s.a)(t,[{key:"handleOnLoad",value:function(){this.setState({showImage:!0,loading:!1})}},{key:"componentDidMount",value:function(){var e=this;this.fetchImages.promise.then(function(t){var a=t[Math.floor(Math.random()*t.length)];e.setState({imageUrl:a.url})}).catch(function(e){return console.log("isCanceled",e.isCanceled)})}},{key:"componentWillUnmount",value:function(){this.fetchImages.cancel()}},{key:"render",value:function(){var e=this.props.classes,t=this.state,a=t.imageUrl,n=t.showImage,r=t.loading;return o.a.createElement("div",null,r?o.a.createElement(je.a,{className:re()(e.root,e.paper)},o.a.createElement(we.a,null)):null,o.a.createElement(ye.a,{in:n,timeout:{enter:2e3,exit:0}},o.a.createElement(je.a,{className:e.paper,style:{backgroundImage:"url(".concat(a,")")}},o.a.createElement("img",{src:a,alt:"Flowers",onLoad:this.handleOnLoad,style:{display:"none"}}))))}}]),t}(o.a.Component),Ne=Object(v.withStyles)(function(e){var t;return{root:{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"},paper:(t={},Object(h.a)(t,e.breakpoints.down("sm"),{height:"calc(100vh - 45px)"}),Object(h.a)(t,"width","100%"),Object(h.a)(t,"height","calc(100vh - 85px)"),Object(h.a)(t,"backgroundPosition","center"),Object(h.a)(t,"backgroundRepeat","no-repeat"),Object(h.a)(t,"backgroundSize","cover"),Object(h.a)(t,"color","grey"),Object(h.a)(t,"boxShadow","none"),Object(h.a)(t,"borderRadius","0px"),t)}})(Se);var Ie=Object(v.withStyles)(function(e){return{root:{flexGrow:1}}})(function(e){var t=e.classes;return o.a.createElement("div",{className:t.root},o.a.createElement(y.a,{container:!0,spacing:0,justify:"center"},o.a.createElement(y.a,{item:!0,xs:12},o.a.createElement(Ne,null))))}),Le=a(58);var Ue=Object(v.withStyles)(function(e){return{root:{display:"flex",justifyContent:"center",height:"80vh"},paper:{width:500,height:"100%",marginTop:"2%",backgroundColor:"#ebfaf9"}}})(function(e){var t=e.classes;return o.a.createElement(ye.a,{in:!0,timeout:{enter:400,exit:0}},o.a.createElement("div",{className:t.root},o.a.createElement(je.a,{className:t.paper},o.a.createElement(Le.a,{variant:"h6",align:"center"},"About author"))))}),Te=a(71),De=a.n(Te),Fe=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(l.a)(this,Object(m.a)(t).call(this,e))).fetchImageCategories=xe(new Promise(function(e,t){T.a.firestore().collection("images").doc("categories").get().then(function(a){a.exists||t("Doc doesn't exist"),e(a.data().categories)})})),a.state={categoriesData:[],checked:!1,fade:!1},a}return Object(u.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.fetchImageCategories.promise.then(function(t){e.setState({categoriesData:t,checked:!0,fade:!0})}).catch(function(e){return console.log("isCanceled",e.isCanceled)})}},{key:"componentWillUnmount",value:function(){this.fetchImageCategories.cancel()}},{key:"render",value:function(){var e=this.props.classes,t=this.state,a=t.checked,n=t.fade;return o.a.createElement(ye.a,{in:n,timeout:{enter:400,exit:0}},o.a.createElement("div",{className:e.root},o.a.createElement(je.a,{className:e.paper},o.a.createElement(y.a,{container:!0,spacing:8,className:e.categoriesContainer},this.state.categoriesData.map(function(t,n){return o.a.createElement(De.a,Object.assign({key:t.category.toLowerCase(),in:a,style:{transformOrigin:"0 0 0"}},a?{timeout:1e3*(n+1)}:{}),o.a.createElement(ie.a,{to:"/category/".concat(t.category.toLowerCase()),style:{textDecoration:"none"}},o.a.createElement(Le.a,{className:e.links,variant:"h4",align:"center"},t.category)))})))))}}]),t}(o.a.Component),Pe=Object(v.withStyles)(function(e){var t,a;return{root:{backgroundColor:"white",display:"flex",alignItems:"center",justifyContent:"center",padding:"1%"},paper:(t={width:450,padding:"4% 0% 4% 0%",marginTop:"2%"},Object(h.a)(t,e.breakpoints.down("sm"),{width:"65%",marginTop:"5%",padding:"7% 0% 3% 0%",borderRadius:"20px"}),Object(h.a)(t,e.breakpoints.down("xs"),{width:"100%",marginTop:"5%",padding:"7% 0% 3% 0%",borderRadius:"20px"}),Object(h.a)(t,"backgroundColor","white"),Object(h.a)(t,"border","1px #dbdbdb solid"),Object(h.a)(t,"borderRadius","30px"),Object(h.a)(t,"boxShadow","none"),t),categoriesContainer:{flexDirection:"column"},links:(a={marginBottom:"1.5em"},Object(h.a)(a,e.breakpoints.down("sm"),{marginBottom:"1.1em"}),Object(h.a)(a,e.breakpoints.down("xs"),{marginBottom:".7em"}),Object(h.a)(a,"&:hover",{color:"black"}),Object(h.a)(a,"fontFamily","Fredericka the Great, cursive"),Object(h.a)(a,"fontSize",26),a)}})(Fe),Re=a(41),Ae=a.n(Re),We=a(35),Be=a.n(We),Ge=a(54),ze=a.n(Ge);var Me=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(l.a)(this,Object(m.a)(t).call(this,e))).handleClose=function(){a.setState({openModal:!1})},a.fetchImages=xe(new Promise(function(e,t){var n=a.props.match.params.category;T.a.firestore().collection("images").where("category","==",n).get().then(function(a){a.empty&&t("There are no documents in the query snapshot");var n=[];a.forEach(function(e){var t=e.data(),a=t.id,o=t.name,r=t.url,i=t.thumbUrl,c=t.category,s=t.description;n.push({id:a,name:o,url:r,thumbUrl:i,category:c,description:s})}),e(n)})})),a.state={images:[],openModal:!1,imageUrl:"",imageName:""},a.handleOpen=a.handleOpen.bind(Object(d.a)(Object(d.a)(a))),a.handleClose=a.handleClose.bind(Object(d.a)(Object(d.a)(a))),a}return Object(u.a)(t,e),Object(s.a)(t,[{key:"handleOpen",value:function(e){this.setState({openModal:!0,imageUrl:e.target.dataset.url,imageName:e.target.dataset.title})}},{key:"componentDidMount",value:function(){var e=this;this.fetchImages.promise.then(function(t){e.setState({images:t})}).catch(function(e){return console.log("isCanceled",e.isCanceled)})}},{key:"componentDidUpdate",value:function(e){e.hasOwnProperty("match")&&e.match.params.category!==this.props.match.params.category&&this.setImageSource()}},{key:"componentWillUnmount",value:function(){this.fetchImages.cancel()}},{key:"render",value:function(){var e=this,t=this.state,a=t.images,n=t.openModal,r=t.imageUrl,i=t.imageName,c=this.props,s=c.classes,l=c.match;return o.a.createElement("div",{className:s.root},o.a.createElement(Le.a,{className:s.category,gutterBottom:!0,variant:"h4",align:"center"},l.params.category),o.a.createElement(y.a,{container:!0,spacing:0,justify:"center"},a.map(function(t){return o.a.createElement(y.a,{item:!0,xs:12,md:6,lg:4,key:t.id,className:s.gridItem},o.a.createElement(Be.a,{className:s.card,about:t.category.toLowerCase()},o.a.createElement(ze.a,{className:s.media,image:t.thumbUrl,"data-url":t.url,title:t.name,onClick:e.handleOpen})))})),o.a.createElement(Ae.a,{"aria-labelledby":l.params.category,"aria-describedby":"images",open:n},o.a.createElement("div",{style:{top:"".concat(0,"%"),left:"".concat(0,"%"),transform:"translate(-".concat(0,"%, -").concat(0,"%)")},className:s.paper,onClick:this.handleClose},o.a.createElement("div",{className:s.imageContainer},o.a.createElement("img",{src:r,alt:i,className:s.image})))))}}]),t}(o.a.Component),Ve=Object(v.withStyles)(function(e){return{root:Object(h.a)({paddingTop:30},e.breakpoints.down("sm"),{paddingTop:5}),gridItem:Object(h.a)({padding:"45px 0px 45px 0px"},e.breakpoints.down("sm"),{padding:8}),category:{marginTop:20,fontFamily:"Great Vibes, cursive",fontSize:56,textTransform:"capitalize"},card:{margin:"auto","&:hover":{opacity:.8},maxWidth:400,borderRadius:0},cardContent:{backgroundColor:"#f5f5f5"},media:{height:250},paper:{boxSizing:"border-box",display:"flex",justifyContent:"center",alignItems:"center",position:"absolute",height:"100vh",width:"100vw",backgroundColor:"black"},imageContainer:{maxHeight:"100%"},image:{maxWidth:"100%",maxHeight:"100vh"}}})(Me),He=a(167),_e=a.n(He),qe=a(37),Je=a.n(qe),Ke=a(38),Qe=a.n(Ke),Ze=a(55),$e=a.n(Ze),Xe=a(56),Ye=a.n(Xe),et=a(45),tt=a.n(et),at=a(128),nt=a.n(at),ot=a(169),rt=a.n(ot),it=a(42),ct=a.n(it);function st(e,t){var a=T.a.firestore();a.collection(e).add(t).then(function(e){var n=a.collection("blog").doc(t.postId);a.runTransaction(function(e){return e.get(n).then(function(t){var a=t.data().commentsCounter+1;e.update(n,{commentsCounter:a})})}).then(function(e){}).catch(function(e){console.log('Transaction "+1 comment" failure:',e)})}).catch(function(e){console.error("Error adding comment: ",e)})}var lt=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(l.a)(this,Object(m.a)(t).call(this,e))).state={commentField:""},a.publishComment=a.publishComment.bind(Object(d.a)(Object(d.a)(a))),a}return Object(u.a)(t,e),Object(s.a)(t,[{key:"publishComment",value:function(){var e=this.props,t=e.user,a=e.postId,n=this.state.commentField;if(""!==n){var o={postId:a,userId:t.googleId,userName:t.name,content:n,date:U.firestore.Timestamp.now(),imageUrl:t.imageUrl};this.setState({commentField:""}),st("comments",o)}}},{key:"render",value:function(){var e=this,t=this.props,a=t.classes,n=t.user;return o.a.createElement("div",null,o.a.createElement(Be.a,{className:a.card},o.a.createElement(Je.a,{className:a.header,avatar:o.a.createElement(w.a,{alt:n.name,src:n.imageUrl,className:a.avatar}),title:n.name})),o.a.createElement(B.a,{className:a.textField,id:"outlined-multiline-static",label:"Write a comment:",fullWidth:!0,multiline:!0,rows:"4",margin:"normal",variant:"outlined",value:this.state.commentField,onChange:function(t){return e.setState({commentField:t.target.value})}}),o.a.createElement(A.a,{variant:"outlined",color:"primary",className:a.button,onClick:this.publishComment},"Publish"))}}]),t}(o.a.Component),mt=Object(v.withStyles)(function(e){return{avatar:{margin:10},card:{boxShadow:"none"},header:{padding:"0px 0px -5px 0px"},button:{margin:e.spacing.unit},textField:{marginTop:-5}}})(lt),ut=a(168),dt=a.n(ut),ht=function(e){function t(){return Object(c.a)(this,t),Object(l.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e=this.props,t=e.classes,a=e.subcomment;return o.a.createElement("div",{className:t.root},o.a.createElement(Be.a,{className:t.card},o.a.createElement(Je.a,{className:t.header,avatar:o.a.createElement(w.a,{alt:a.userName,src:a.imageUrl,className:t.avatar}),title:a.userName,subheader:a.date}),o.a.createElement(Qe.a,null,o.a.createElement(te.a,{component:"p"},a.content))),o.a.createElement(ct.a,null))}}]),t}(o.a.Component),pt=Object(v.withStyles)(function(e){return{card:{borderRadius:"unset",boxShadow:"none"},header:{padding:0},avatar:{margin:10}}})(ht),gt=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(l.a)(this,Object(m.a)(t).call(this,e))).state={commentField:"",commentsNumber:"",expanded:!1},a.handleExpandClick=a.handleExpandClick.bind(Object(d.a)(Object(d.a)(a))),a.sendSubcomment=a.sendSubcomment.bind(Object(d.a)(Object(d.a)(a))),a}return Object(u.a)(t,e),Object(s.a)(t,[{key:"handleExpandClick",value:function(){this.setState(function(e){return{expanded:!e.expanded}})}},{key:"sendSubcomment",value:function(){var e=this.props,t=e.comment,a=e.user,n=this.state.commentField;if(""!==n){var o={postId:t.postId,commentId:t.commentId,userId:a.googleId,userName:a.name,content:n,date:T.a.firestore.Timestamp.now(),imageUrl:a.imageUrl};this.setState({commentField:""}),st("subcomments",o)}}},{key:"render",value:function(){var e=this,t=this.props,a=t.classes,n=t.comment,r=t.user,i=t.subcomments,c=this.state,s=c.commentsNumber,l=c.expanded;return o.a.createElement(Be.a,{className:a.card},o.a.createElement(Je.a,{avatar:o.a.createElement(w.a,{alt:n.userName,src:n.imageUrl,className:a.avatar}),title:n.userName,subheader:n.date,className:a.header}),o.a.createElement(Qe.a,null,o.a.createElement(te.a,{component:"p"},n.content)),o.a.createElement($e.a,{className:a.actions,disableActionSpacing:!0},o.a.createElement(te.a,null,s),o.a.createElement(tt.a,{className:re()(a.expand,Object(h.a)({},a.expandOpen,l)),onClick:this.handleExpandClick,"aria-expanded":l,"aria-label":"Show more"},o.a.createElement(dt.a,null))),o.a.createElement(ct.a,null),o.a.createElement(Ye.a,{in:l,timeout:"auto",unmountOnExit:!0},o.a.createElement(Qe.a,null,o.a.createElement("div",{className:a.subcomments},i.filter(function(e){return e.commentId===n.commentId}).map(function(e){return o.a.createElement(pt,{key:e.subcommentId,subcomment:e})}),o.a.createElement(y.a,{container:!0,spacing:8,alignItems:"flex-end"},o.a.createElement(y.a,{item:!0},r?o.a.createElement(w.a,{alt:r.userName,src:r.imageUrl,className:a.avatar}):null),o.a.createElement(y.a,{item:!0},r?o.a.createElement("div",null,o.a.createElement(B.a,{id:"outlined-dense",label:"Write a response:",className:re()(a.textField,a.dense),margin:"dense",variant:"outlined",value:this.state.commentField,onChange:function(t){return e.setState({commentField:t.target.value})}}),o.a.createElement(A.a,{variant:"outlined",color:"primary",className:a.button,onClick:this.sendSubcomment},"Answer")):o.a.createElement(te.a,null,"Sign in to write a comment.")))))))}}]),t}(o.a.Component),bt=Object(v.withStyles)(function(e){return{card:{borderRadius:"unset",boxShadow:"none"},header:{padding:0},avatar:{margin:10},subcomments:{paddingLeft:50},actions:{display:"flex"},expand:Object(h.a)({transform:"rotate(0deg)",transition:e.transitions.create("transform",{duration:e.transitions.duration.shortest}),marginLeft:"auto"},e.breakpoints.up("sm"),{marginRight:-8}),expandOpen:{transform:"rotate(180deg)"},margin:{margin:e.spacing.unit},textField:{marginLeft:e.spacing.unit,marginRight:e.spacing.unit},dense:{marginTop:16},button:{margin:e.spacing.unit}}})(gt),ft=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(l.a)(this,Object(m.a)(t).call(this,e))).state={comments:[],subcomments:[]},a}return Object(u.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){var e=this,t=this.props.postId,a=T.a.firestore();this.unsubscribeComments=a.collection("comments").where("postId","==",t).orderBy("date","asc").onSnapshot(function(t){var a=[];t.forEach(function(e){var t=e.data(),n=t.content,o=t.postId,r=t.userId,i=t.date,c=t.userName,s=t.imageUrl;a.push({postId:o,commentId:e.id,content:n,date:i.toDate().toDateString()+"  "+i.toDate().toLocaleTimeString(),userId:r,userName:c,imageUrl:s})}),e.setState({comments:a})}),this.unsubscribeSubcomments=a.collection("subcomments").where("postId","==",t).orderBy("date","asc").onSnapshot(function(t){var a=[];t.forEach(function(e){var t=e.data(),n=t.content,o=t.postId,r=t.commentId,i=t.userId,c=t.date,s=t.userName,l=t.imageUrl;a.push({postId:o,commentId:r,subcommentId:e.id,content:n,date:c.toDate().toDateString()+"  "+c.toDate().toLocaleTimeString(),userId:i,userName:s,imageUrl:l})}),e.setState({subcomments:a})})}},{key:"componentWillUnmount",value:function(){this.unsubscribeComments(),this.unsubscribeSubcomments()}},{key:"render",value:function(){var e=this.state,t=e.comments,a=e.subcomments,n=this.props,r=n.classes,i=n.user;return o.a.createElement(je.a,{className:r.paper},t.map(function(e){return o.a.createElement(bt,{className:r.comments,key:e.commentId,comment:e,subcomments:a,user:i})}))}}]),t}(o.a.Component),vt=Object(v.withStyles)(function(e){return{paper:{borderRadius:"none",boxShadow:"none"}}})(ft),Ot=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(l.a)(this,Object(m.a)(t).call(this,e))).isLikeRecieved=!1,a.isLikePending=!1,a.isLiked=!1,a.state={commentsCounter:0,chat:!1,likes:0,changeLikeColor:!1,fade:!1},a.handleCommentClick=a.handleCommentClick.bind(Object(d.a)(Object(d.a)(a))),a.addToLiked=a.addToLiked.bind(Object(d.a)(Object(d.a)(a))),a.mediaOnLoad=a.mediaOnLoad.bind(Object(d.a)(Object(d.a)(a))),a}return Object(u.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){var e=this,t=T.a.firestore();this.unsubscribeBlog=t.collection("blog").doc(this.props.postId).onSnapshot(function(t){if(t.exists){var a=t.data().commentsCounter,n=t.data().likes;e.setState({commentsCounter:a,likes:n})}else console.log("postId ".concat(e.props.postId," doesn't exists or can't retrieve it"))}),"object"===typeof this.props.user&&this.props.user.hasOwnProperty("userId")&&(this.unsubscribeUserLiked=t.collection("users").doc(this.props.user.userId).collection("userLiked").where("postId","==",this.props.postId).onSnapshot(function(t){1===t.docs.length&&e.setState(function(){return e.isLikeRecieved=!0,e.isLiked=t.docs[0].data().isLiked,{changeLikeColor:e.isLiked}})}))}},{key:"componentDidUpdate",value:function(e){var t=this,a=this.props.user;if(a!==e.user&&void 0!==a&&a.hasOwnProperty("userId")){var n=T.a.firestore();this.unsubscribeUserLiked=n.collection("users").doc(a.userId).collection("userLiked").where("postId","==",this.props.postId).onSnapshot(function(e){1===e.docs.length&&t.setState(function(){return t.isLikeRecieved=!0,t.isLiked=e.docs[0].data().isLiked,{changeLikeColor:t.isLiked}})})}else a!==e.user&&void 0===a&&(this.isLikeRecieved=!1,this.isLiked=!1,this.setState({changeLikeColor:!1}))}},{key:"componentWillUnmount",value:function(){this.unsubscribeBlog(),this.unsubscribeUserLiked&&this.unsubscribeUserLiked()}},{key:"addToLiked",value:function(){var e=this;if("object"===typeof this.props.user&&(this.props.user.hasOwnProperty("userId")||this.isLikeRecieved)&&!this.isLikePending){this.isLikePending=!this.isLikePending;var t=this.isLiked?-1:1;this.setState({changeLikeColor:!this.state.changeLikeColor,likes:this.state.likes+t});var a=T.a.firestore(),n=T.a.firestore().collection("blog").doc(this.props.postId);a.runTransaction(function(e){return e.get(n).then(function(a){var o=a.data().likes+t;e.update(n,{likes:o})})}).then(function(){var t=a.collection("users").doc(e.props.user.userId).collection("userLiked");t.where("postId","==",e.props.postId).get().then(function(a){0===a.docs.length?t.add({postId:e.props.postId,isLiked:!e.isLiked}).then(function(){e.isLikePending=!1}).catch(function(e){console.log('Adding "isLiked" doc failure: ',e)}):t.doc(a.docs[0].id).update({isLiked:!e.isLiked}).then(function(){e.isLikePending=!1}).catch(function(e){console.log('Updating "isLiked" doc failure: ',e)})})}).catch(function(e){console.log('Transaction "'.concat(t,' like" failure: '),e)})}}},{key:"handleCommentClick",value:function(){this.setState(function(e){return{chat:!e.chat}})}},{key:"mediaOnLoad",value:function(){this.setState({fade:!0})}},{key:"render",value:function(){var e=this.props,t=e.classes,a=e.post,n=e.postId,r=e.user,i=this.state,c=i.commentsCounter,s=i.chat,l=i.changeLikeColor,m=i.likes,u=i.fade;return a.date=new Date(a.date).toDateString(),o.a.createElement(ye.a,{in:u,timeout:{enter:400,exit:0}},o.a.createElement(Be.a,{className:t.card},o.a.createElement(Je.a,{avatar:o.a.createElement(w.a,{src:a.avatarUrl,"aria-label":"Logo",className:re()(t.avatar,t.bigAvatar)}),title:a.title,titleTypographyProps:{className:t.titleCard},subheader:a.date}),o.a.createElement("a",{type:"button",target:"_blank",rel:"noopener noreferrer",href:a.linkUrl},o.a.createElement(ze.a,{className:t.media,image:a.imageUrl,title:a.title}),o.a.createElement("img",{src:a.imageUrl,alt:a.title,onLoad:this.mediaOnLoad,style:{display:"none"}})),o.a.createElement(Qe.a,null,o.a.createElement(te.a,{className:t.content,component:"p",variant:"body1",gutterBottom:!0,align:"justify"},a.content),o.a.createElement(te.a,{component:"p",align:"left",variant:"caption"},"Source:",o.a.createElement("a",{type:"text/html",target:"_blank",rel:"noopener noreferrer",href:a.homepageUrl},a.homepageUrl))),o.a.createElement($e.a,{className:t.actions,disableActionSpacing:!0},o.a.createElement(tt.a,{"aria-label":"Add to favorites",onClick:this.addToLiked},l?o.a.createElement(nt.a,{className:t.favourite}):o.a.createElement(nt.a,{className:t.unfavourite}),o.a.createElement(te.a,null,m)),o.a.createElement(tt.a,{onClick:this.handleCommentClick,"aria-expanded":s,"aria-label":"Comment"},o.a.createElement(rt.a,null),o.a.createElement(te.a,null,c))),o.a.createElement(Ye.a,{in:s,timeout:"auto",unmountOnExit:!0},o.a.createElement(ct.a,null),o.a.createElement(Qe.a,null,o.a.createElement(vt,{postId:n,user:r}),r?o.a.createElement(mt,{postId:n,user:r}):o.a.createElement(te.a,null,"Sign in to write a comment.")))))}}]),t}(o.a.Component),jt=Object(v.withStyles)(function(e){return{card:{boxShadow:"none",borderBottom:"1px #dbdbdb solid",borderRadius:0},titleCard:{fontSize:"1.2rem",textTransform:"capitalize"},media:{paddingTop:"56.25%"},avatar:{margin:10},bigAvatar:{width:50,height:50},content:{display:"-webkit-box",overflow:"hidden",boxOrient:"vertical",textOverflow:"ellipsis",lineClamp:4},actions:{display:"flex"},expand:Object(h.a)({transform:"rotate(0deg)",transition:e.transitions.create("transform",{duration:e.transitions.duration.shortest}),marginLeft:"auto"},e.breakpoints.up("sm"),{marginRight:-8}),expandOpen:{transform:"rotate(180deg)"},favourite:{color:"#dc143c"},unfavourite:{color:"grey"}}})(Ot),Et=D("B2F2ETSVIP","7d696398d27173e3b54bb74a08b7ee8a").initIndex("blog_posts");var yt=function(e){return new Promise(function(t){Et.search({query:e,hitsPerPage:50},function(e,a){if(e)throw e;t(a)})})},kt=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(l.a)(this,Object(m.a)(t).call(this,e))).AlgoliaResults=xe(yt("")),a.state={posts:[]},a.handleOnSearchChange=a.handleOnSearchChange.bind(Object(d.a)(Object(d.a)(a))),a.handleOnContentVisible=a.handleOnContentVisible.bind(Object(d.a)(Object(d.a)(a))),a}return Object(u.a)(t,e),Object(s.a)(t,[{key:"handleOnContentVisible",value:function(){}},{key:"handleOnSearchChange",value:function(e){var t=this,a=e.target.value;this.AlgoliaResults=xe(yt(a)),this.AlgoliaResults.promise.then(function(e){t.setState({posts:e.hits})})}},{key:"componentDidMount",value:function(){var e=this;this.AlgoliaResults.promise.then(function(t){e.setState({posts:t.hits})})}},{key:"componentWillUnmount",value:function(){this.AlgoliaResults.cancel()}},{key:"render",value:function(){var e=this,t=this.props.classes,a=this.state.posts;return o.a.createElement("div",{className:t.root},o.a.createElement(y.a,{container:!0,spacing:0,className:t.titleContainer},o.a.createElement(y.a,{item:!0,xs:12,md:2,className:t.articleContainer},o.a.createElement(te.a,{variant:"h6",gutterBottom:!1,align:"left",className:t.articlesTitle},"LATEST ARTICLES"))),o.a.createElement(y.a,{container:!0,spacing:0,className:t.grid},o.a.createElement(y.a,{item:!0,sm:12,md:8},o.a.createElement("div",{className:t.posts},o.a.createElement(y.a,{container:!0,spacing:0},a.map(function(a){return o.a.createElement(y.a,{item:!0,xs:12,key:a.objectID},o.a.createElement(_e.a,{className:t.lazyLoad,offsetVertical:1e3,onContentVisible:e.handleOnContentVisible},o.a.createElement(Ct.Consumer,null,function(e){return o.a.createElement(jt,{postId:a.objectID,post:a,user:e})})))})))),o.a.createElement(y.a,{item:!0,sm:12,md:4},o.a.createElement(y.a,{container:!0,spacing:0,className:t.grid},o.a.createElement(y.a,{item:!0,sm:12,md:12},o.a.createElement(B.a,{className:t.textField,onChange:this.handleOnSearchChange,id:"outlined-search",label:"Search...",type:"search",margin:"normal",variant:"outlined"}))))))}}]),t}(o.a.Component),wt=Object(v.withStyles)(function(e){var t,a,n,o;return{root:{flexGrow:1},grid:Object(h.a)({},e.breakpoints.down("sm"),{flexDirection:"column-reverse"}),titleContainer:{alignItems:"center"},textField:(t={},Object(h.a)(t,e.breakpoints.down("sm"),{marginLeft:4*e.spacing.unit}),Object(h.a)(t,e.breakpoints.down("xs"),{marginLeft:e.spacing.unit}),Object(h.a)(t,"marginLeft",e.spacing.unit),Object(h.a)(t,"marginRight",e.spacing.unit),t),articlesTitle:(a={},Object(h.a)(a,e.breakpoints.down("sm"),{padding:"25px 0px 0px 20px",fontSize:16}),Object(h.a)(a,"color","grey"),a),articleContainer:(n={marginLeft:"25%"},Object(h.a)(n,e.breakpoints.down("md"),{marginLeft:"13%"}),Object(h.a)(n,e.breakpoints.down("sm"),{marginLeft:"7%"}),Object(h.a)(n,e.breakpoints.down("xs"),{marginLeft:"0%"}),n),posts:(o={marginLeft:"30%"},Object(h.a)(o,e.breakpoints.down("lg"),{marginLeft:"25%"}),Object(h.a)(o,e.breakpoints.down("md"),{marginLeft:"15%"}),Object(h.a)(o,e.breakpoints.down("sm"),{margin:"5%"}),Object(h.a)(o,e.breakpoints.down("xs"),{margin:"0%"}),o),avatar:{margin:10},lazyLoad:Object(h.a)({display:"inline-block",position:"relative",height:600},e.breakpoints.down("sm"),{height:300})}})(kt),Ct=o.a.createContext(),xt=Object(v.createMuiTheme)({palette:{primary:j.a},typography:{useNextVariants:!0,fontFamily:"Noto Sans, sans-serif"}}),St=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(l.a)(this,Object(m.a)(t).call(this,e))).responseGoogle=function(e){(function(e){if("object"===typeof e&&e.hasOwnProperty("googleId")){var t={googleId:e.googleId,email:"none",imageUrl:e.imageUrl,name:e.name,familyName:e.familyName,givenName:e.givenName,role:""};return new Promise(function(e){var a=T.a.firestore().collection("users");a.where("googleId","==",t.googleId).get().then(function(n){if(n.empty)t.role="user",a.add(t).then(function(a){t.userId=a.id,e(t)}).catch(function(e){console.error("Error adding document: ",e)});else{var o=n.docs[0].id;a.doc(o).update({name:t.name,familyName:t.familyName,givenName:t.givenName,imageUrl:t.imageUrl}).then(function(){a.doc(o).get().then(function(t){var a=t.data();a.userId=t.id,e(a)})})}}).catch(function(e){console.log("Error getting document:",e)})})}})(e.profileObj).then(function(e){a.setState({user:e})})},a.logout=function(){a.setState({user:void 0})},a.state={user:void 0},a.responseGoogle=a.responseGoogle.bind(Object(d.a)(Object(d.a)(a))),a.logout=a.logout.bind(Object(d.a)(Object(d.a)(a))),a}return Object(u.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e=this.state.user,t=this.props.classes;return o.a.createElement(v.MuiThemeProvider,{theme:xt},o.a.createElement(p.a,null,o.a.createElement(Ct.Provider,{value:e},o.a.createElement(y.a,{container:!0,spacing:0,className:t.root},o.a.createElement(y.a,{item:!0,xs:10,sm:12},o.a.createElement(ne,null,e?o.a.createElement(f.GoogleLogout,{className:t.GoogleLogout,tag:"div",buttonText:"",onLogoutSuccess:this.logout},o.a.createElement(w.a,{className:t.avatar,alt:e.userName,src:e.imageUrl})):o.a.createElement(f.GoogleLogin,{className:t.GoogleLogin,clientId:"815652919811-04teroae4aok8u52359jdr99fg4hdbk1.apps.googleusercontent.com",tag:"button",uxMode:"popup",buttonText:"Google login",onSuccess:this.responseGoogle,onFailure:this.responseGoogle,isSignedIn:!0}))),o.a.createElement(y.a,{item:!0,xs:2,sm:12},o.a.createElement(x.a,{only:["xs"]},o.a.createElement(de,null)),o.a.createElement(x.a,{only:["sm","md","lg","xl"]},o.a.createElement(ve,null))),o.a.createElement(y.a,{item:!0,xs:12},o.a.createElement(g.a,null,o.a.createElement(b.a,{exact:!0,path:"/",component:Ie}),o.a.createElement(b.a,{path:"/main",component:Ie}),o.a.createElement(b.a,{path:"/about",component:Ue}),o.a.createElement(b.a,{path:"/gallery/",component:Pe}),o.a.createElement(b.a,{path:"/category/:category",component:Ve}),o.a.createElement(b.a,{path:"/blog",component:wt}),o.a.createElement(b.a,{render:function(){return o.a.createElement("div",null,"Not Found")}}))),o.a.createElement(y.a,{item:!0,xs:12})))))}}]),t}(n.Component),Nt=Object(v.withStyles)(function(e){return{root:{flexGrow:1,alignItems:"center"},avatar:Object(h.a)({},e.breakpoints.down("sm"),{display:"inline-flex",width:30,height:30}),GoogleLogin:{position:"absolute",marginLeft:"81%",border:"white",backgroundColor:"white",color:"grey",height:32,width:60,borderRadius:10,fontSize:12,fontWeight:"bold","&:hover":{border:"1px #dbdbdb solid"}},GoogleLogout:{position:"absolute",marginLeft:"81%",fontSize:16}}})(St),It=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function Lt(e){navigator.serviceWorker.register(e).then(function(e){e.onupdatefound=function(){var t=e.installing;t.onstatechange=function(){"installed"===t.state&&(navigator.serviceWorker.controller?console.log("New content is available; please refresh."):console.log("Content is cached for offline use."))}}}).catch(function(e){console.error("Error during service worker registration:",e)})}a(425);i.a.render(o.a.createElement(Nt,null),document.getElementById("root")),function(){if("serviceWorker"in navigator){if(new URL("",window.location).origin!==window.location.origin)return;window.addEventListener("load",function(){var e="".concat("","/service-worker.js");It?(function(e){fetch(e).then(function(t){404===t.status||-1===t.headers.get("content-type").indexOf("javascript")?navigator.serviceWorker.ready.then(function(e){e.unregister().then(function(){window.location.reload()})}):Lt(e)}).catch(function(){console.log("No internet connection found. App is running in offline mode.")})}(e),navigator.serviceWorker.ready.then(function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://goo.gl/SC7cgQ")})):Lt(e)})}}()}},[[231,2,1]]]);
//# sourceMappingURL=main.8a5bb879.chunk.js.map