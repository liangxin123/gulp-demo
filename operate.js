/**
 * 
 */

var operate = {

	init : function() {
		/*
		 * if(localStorage||!(localStorage.getItem("agentLists"))){ var
		 * agentLists={ "agent1":["Reource:ubuntu","firefox3","core-duo"],
		 * "agent2":["Resource:ubuntu","firefox3","mysql","core-duo"],
		 * "agent3":["Resource:ubuntu","firefox3","mysql","core-duo"],
		 * "agent4":["Resource:ubuntu"] };
		 * localStorage.setItem("agentLists",JSON.stringify(agentLists)); }
		 */
		this.agentLists = {
			"agent1" : [ "Reource:ubuntu", "firefox3", "core-duo" ],
			"agent2" : [ "Resource:ubuntu", "firefox3", "mysql", "core-duo" ],
			"agent3" : [ "Resource:ubuntu", "firefox3", "mysql", "core-duo" ],
			"agent4" : [ "Resource:ubuntu" ]
		};

		this.render();
	},
	render : function() {
		// var agentLists=localStorage.getItem('agentLists');
		var agentLists = this.agentLists;
		var index = 0;
		for ( var agent in agentLists) {
			var list = agentLists[agent];
			var setLists = document.querySelector('.agent-list');
			var liElem = setLists.children[index];
			var Resource = liElem.querySelector('.res-operate');
			var textspan = '';
			textspan = '<a href="javascript:;" class="addResource" id=' + agent
					+ '><span>+</span>' + "Spacify Resource"
					+ '</a><span class="splite">|</span>';
			list.forEach(function(res) {
				textspan += '<a href="javascript:;" class="delResource">'
						+ '<span>' + res
						+ '</span><img src="./images/delete.png"></a>';
			});
			index++;
			Resource.innerHTML = textspan;
		}
	},
};
document.onreadystatechange = function() {
	if (document.readyState == "complete") {
		operate.init();
	}
}

function addOrDelete(event) {
	var target = event.target;
	var parent = event.target.parentNode;
	if (parent.className === "delResource" || parent.classList
			&& parent.classList.contains('delResource')) {
		deleteItem(parent);
	} else if (target.className === 'addResource' || target.classList
			&& target.classList.contains('addResource')) {
		moveAddlayer(target);
	} else if (parent.className === 'addResource' || parent.classList
			&& parent.classList.contains('addResource')) {
		moveAddlayer(parent);
	}
}
function deleteItem(parent) {
	var resources = parent.parentNode;
	resources.removeChild(parent);
	/*
	 * var res=parent.querySelector("span").innerText; var
	 * targetId=resources.querySelector('.addResource').id;
	 * if(localStorage&&localStorage.getItem('agentLists')){ var
	 * agentLists=JSON.parse(localStorage.getItem('agentLists')); for(var key in
	 * agentLists){ if(key==targetId){ var index=agentLists[key].indexOf(res);
	 * agentLists[key].splice(index,1); } }
	 * localStorage.setItem('agentLists',JSON.stringify(agentLists)); }
	 */
}
function addItem() {
	//var targetId = document.querySelector(".addLayer").dataset.agent;
	var targetId = document.querySelector(".addLayer").id;
	var target = document.getElementById(targetId);
	var parent = target.parentNode;
	var value = document.querySelector('.addContainer input').value.trim();
	var addResouces;
	var agentLists = this.agentLists;
	/*
	 * if(localStorage&&localStorage.getItem('agentLists')){ var
	 * agentLists=JSON.parse(localStorage.getItem('agentLists')); }
	 */
	if (!value) {
		return;
	}
	if (value.indexOf(';') > -1) {
		addResouces = value.split(";");

		addResouces.forEach(function(res) {
			var elem = document.createElement('a');
			elem.classList.add("delResource");
			elem.setAttribute("href", "javascript:;");
			elem.innerHTML = '<span class="resource">' + res
					+ '</span><img src=' + './images/delete.png' + '>';
			parent.appendChild(elem);
			/*
			 * for(var key in agentLists){ if(key==targetId){
			 * agentLists[key].push(res); } }
			 */

		});

	} else {
		// <a href="javascript:;" class="delResource"><span
		// class="resource">core-duo</span><img src="./images/delete.png"></a>
		var elem = document.createElement('a');
		elem.classList.add("delResource");
		elem.setAttribute("href", "javascript:;");
		elem.innerHTML = '<span>' + value + '</span><img src='
				+ './images/delete.png' + '>';
		parent.appendChild(elem);
		/*
		 * for(var key in agentLists){ if(key==targetId){
		 * agentLists[key].push(value); } }
		 */

	}
	// localStorage.setItem('agentLists',JSON.stringify(agentLists));
	hiddenLayer();
}

function moveAddlayer(target) {
	console.log("lxlxlxlx");
	var addLayer = document.querySelector('.addLayer');
	document.querySelector('.addContainer input').value='';
	addLayer.style.display = "block";
	var parent = target.parentNode.parentNode.parentNode.offsetTop;
	var tranX = target.parentNode.parentNode.parentNode.offsetLeft * 2;
	var height = target.parentNode.parentNode.parentNode.offsetHeight
	console.log('lx top' + target.style.top);

	var offset = addLayer.offsetTop;
	var itemHeight = target.parentNode.parentNode.offsetHeight;
	var tranY = offset - parent - itemHeight;

	addLayer.style.transform = "translate(" + tranX + "px,-" + tranY + "px)";
	addLayer.style.transform = "-ms-translate(" + tranX + "px,-" + tranY
			+ "px)";
	addLayer.style.transform = "-moz-translate(" + tranX + "px,-" + tranY
			+ "px)";
	addLayer.style.transform = "-webkit-translate(" + tranX + "px,-" + tranY
			+ "px)";
	//addLayer.dataset.agent = target.id;
	addLayer.id = target.id;

}
function hiddenLayer() {
	var addLayer = document.querySelector('.addLayer');
	addLayer.style.display = "none";
}
