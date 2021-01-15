(this.webpackJsonpgui=this.webpackJsonpgui||[]).push([[0],{145:function(e,t,a){e.exports=a.p+"static/media/loading.d5dde2ac.gif"},158:function(e,t,a){e.exports=a.p+"static/media/example_groups.c55a8117.xlsx"},189:function(e,t,a){e.exports=a(344)},194:function(e,t,a){},195:function(e,t,a){},344:function(e,t,a){"use strict";a.r(t);var n=a(0),l=a.n(n),i=a(24),o=a.n(i),r=(a(194),a(116)),s=a.n(r),c=a(140),u=a(141),d=a(142),p=a(143),m=a(186),h=a(183),f=a(349),g=a(346),y=a(88),b=a(187),E=a(348),_=a(50),v=a(67),x=a(351),k=a(350),w=a(144),O=(a(195),a(145)),z=a.n(O),P=a(96),I=a.n(P),N=a(97),S=a.n(N),G=f.a.Title,T=function(){return l.a.createElement(l.a.Fragment,null,l.a.createElement("center",null,l.a.createElement(G,{level:2},"No-Household Optimization")),l.a.createElement(G,{level:4},l.a.createElement("p",null,"The selected optimization type will find a seat to as many passengers as possible given the social distance constraint and the vehicle's layout."),l.a.createElement("p",null,"As input, you must provide the desired social distance threshold (in inches) and the layout of the vehicle."),l.a.createElement("p",null,"Regarding the latter, you have to provide an excel file containing the (x,y) location of the center of each seat, where the top-right seat is (0,0)."),l.a.createElement("p",null," For example, this excel file ",l.a.createElement("a",{href:S.a},"(link)")," encodes the layout displayed below ")," "),l.a.createElement("center",null,l.a.createElement("img",{src:I.a,alt:"Bus layout"})))},C=a(347),j=a(158),F=a.n(j),H=f.a.Title,D=[{key:"1",GroupId:"1",NumberPassengers:"3"},{key:"2",GroupId:"2",NumberPassengers:"4"},{key:"3",GroupId:"3",NumberPassengers:"1"},{key:"4",GroupId:"4",NumberPassengers:"2"},{key:"5",GroupId:"5",NumberPassengers:"7"},{key:"6",GroupId:"6",NumberPassengers:"1"}],A=[{title:"GroupId",dataIndex:"GroupId",key:"GroupId",align:"center"},{title:"NumberPassengers",dataIndex:"NumberPassengers",key:"NumberPassengers",align:"center"}],B=function(){return l.a.createElement(l.a.Fragment,null,l.a.createElement("center",null,l.a.createElement(H,{level:2},"Household Optimization")),l.a.createElement(H,{level:4},l.a.createElement("p",null,"The selected optimization type will fill in the available seats starting from the back of the vehicle. Group members (e.g., family) are exempt from the social distance constraint."),l.a.createElement("p",null,"As input, you must provide the desired social distance threshold (in inches), the layout of the vehicle, and information about groups."),l.a.createElement("p",null,"Regarding the vehicle's layout, you have to provide an excel file containing the (x,y) location of the center of each seat, where the top-right seat is (0,0)."),l.a.createElement("p",null," For example, this excel file ",l.a.createElement("a",{href:S.a},"(link)")," encodes the layout displayed below ")),l.a.createElement("center",null,l.a.createElement("img",{src:I.a,alt:"Bus layout"})),l.a.createElement(H,{level:4},l.a.createElement("p",null,"To define groups of passengers who can travel together, you must provide an excel file containing two collumns: ",l.a.createElement("i",null,"GroupId")," and ",l.a.createElement("i",null,"NumberPassengers"),"."),l.a.createElement("p",null,l.a.createElement("i",null,"GroupId"),' defines the "pick up" order. ',l.a.createElement("i",null,"NumberPassengers")," defines how many passenger are part of a group and, hence, can travel close to one another."),l.a.createElement("p",null,"For example, this excel file ",l.a.createElement("a",{href:F.a},"(link)")," encodes the configuration displayed below")),l.a.createElement("center",null,l.a.createElement(C.a,{pagination:!1,dataSource:D,columns:A})))},J=f.a.Title,U=g.a.Header,K=g.a.Content,L=g.a.Sider,R=y.a.Option,W="http://10.36.11.28:80",Y=function(e){Object(m.a)(a,e);var t=Object(h.a)(a);function a(){var e;Object(d.a)(this,a);for(var n=arguments.length,i=new Array(n),o=0;o<n;o++)i[o]=arguments[o];return(e=t.call.apply(t,[this].concat(i))).state={social_distance:72,layout_filename:"",group_filename:"",response_optimization:"",first_page:"initial",optimization_type:"",layout_button_disabled:!0,groups_button_disabled:!0,generate_button_disabled:!0},e.UploadFile=function(e){var t={name:"file",accept:".csv,.xlsx",multiple:!1,action:W+"/upload",onChange:function(t){var a=t.file.status;"uploading"!==a&&console.log(t.file,t.fileList),"done"===a?(b.b.success("".concat(t.file.name," file uploaded successfully.")),e.this.setState(Object(u.a)({},e.type+"_filename",t.file.response.filename))):"error"===a&&b.b.error("".concat(t.file.name," file upload failed."))}};return l.a.createElement(E.a,t,l.a.createElement(_.a,{disabled:e.disabled},l.a.createElement(k.a,null)," Click to upload a ",[e.type]," file")," ")},e.Optimize=function(){var t=Object(c.a)(s.a.mark((function t(a){var n,l,i,o;return s.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(a.preventDefault(),""!==e.state.layout_filename){t.next=5;break}b.b.error("Please upload a layout file first",5),t.next=33;break;case 5:if(""!==e.state.group_filename||"Household"!==e.state.optimization_type){t.next=9;break}b.b.error("Please upload a group file first",5),t.next=33;break;case 9:return e.setState({first_page:"loading"}),t.next=12,fetch(W+"/optimize",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({post:e.state})});case 12:return n=t.sent,t.next=15,n.text();case 15:if("Error-PY1"!==(l=t.sent)){t.next=20;break}b.b.error("Error when reading the uploaded layout file",5),t.next=32;break;case 20:if("Error-PY2"!==l){t.next=24;break}b.b.error("Error when reading the uploaded group file",5),t.next=32;break;case 24:return e.setState({response_optimization:l}),t.next=27,fetch(W+"/output",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({post:e.state})});case 27:return i=t.sent,t.next=30,i.blob();case 30:o=t.sent,Object(w.saveAs)(o,"layout.pdf");case 32:e.setState({first_page:"outcome",optimization_type:"",layout_button_disabled:!0,groups_button_disabled:!0,generate_button_disabled:!0});case 33:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),e.OptimizationType=function(t){"no_household"===t?e.setState({first_page:"no_household",optimization_type:"No Household",layout_button_disabled:!1,groups_button_disabled:!0,generate_button_disabled:!1}):"household"===t&&e.setState({first_page:"household",optimization_type:"Household",layout_button_disabled:!1,groups_button_disabled:!1,generate_button_disabled:!1})},e}return Object(p.a)(a,[{key:"componentDidMount",value:function(){document.title="Seating Planner"}},{key:"DefineContent",value:function(){var e;return"initial"===this.state.first_page?e=l.a.createElement(J,{level:2},l.a.createElement("center",null,"Please, select an ",l.a.createElement("i",null,"Optimization Type"))):"no_household"===this.state.first_page?e=l.a.createElement(T,null):"household"===this.state.first_page?e=l.a.createElement(B,null):"loading"===this.state.first_page?e=l.a.createElement(l.a.Fragment,null,l.a.createElement("center",null,l.a.createElement("img",{src:z.a,alt:"Loading"}))):"outcome"===this.state.first_page&&(e=this.state.response_optimization.split("<br>").map((function(e,t){return l.a.createElement("p",{key:t},e)})),e=l.a.createElement(J,{level:2},l.a.createElement("center",null,e)," ")),e}},{key:"render",value:function(){var e=this,t=this.DefineContent();return l.a.createElement(g.a,null,l.a.createElement(U,{className:"header"}," Seating Planner "),l.a.createElement(K,{style:{padding:"0 50px"}},l.a.createElement(g.a,{className:"site-layout-background",style:{padding:"24px 0"}},l.a.createElement(L,{className:"site-layout-background",width:380},l.a.createElement(v.a,{mode:"inline",defaultSelectedKeys:["1"],defaultOpenKeys:["sub1"],style:{height:"100%"}},l.a.createElement(v.a.Item,{key:"1"}," Optimization type:",l.a.createElement(y.a,{value:this.state.optimization_type,style:{width:200},onChange:this.OptimizationType},l.a.createElement(R,{value:"no_household"},"No Household"),l.a.createElement(R,{value:"household"},"Household"))),l.a.createElement(v.a.Item,{key:"2"}," Desired social distance in inches:",l.a.createElement(x.a,{min:0,max:1e3,defaultValue:72,onChange:function(t){return e.setState({social_distance:t})}})),l.a.createElement(v.a.Item,{key:"3"},l.a.createElement(this.UploadFile,{type:"layout",this:this,disabled:this.state.layout_button_disabled})),l.a.createElement(v.a.Item,{key:"4"},l.a.createElement(this.UploadFile,{type:"group",this:this,disabled:this.state.groups_button_disabled})),l.a.createElement(v.a.Item,{key:"5"},l.a.createElement(_.a,{type:"primary",disabled:this.state.generate_button_disabled,onClick:this.Optimize},"Generate seating plan")))),l.a.createElement(K,null,t))))}}]),a}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(l.a.createElement(Y,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},96:function(e,t,a){e.exports=a.p+"static/media/sample-layout.87170033.png"},97:function(e,t,a){e.exports=a.p+"static/media/example_bus_layout.66e30d9b.xlsx"}},[[189,1,2]]]);
//# sourceMappingURL=main.97975765.chunk.js.map