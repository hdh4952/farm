BedSoilScore = 0;
strain = "";
plantingPercent = 0;
strainInfo = [`<h1>영호진미</h1><br><img src="./img/영호진미.jpg" style="height:150px;width:450px;"><br><h1>재배 적응지역</h1><br><img src="./img/영호진미재배지역.jpg">`, `<h1>신동진</h1><br><img src="./img/신동진.jpg" style="height:150px;width:450px;"><br><h1>재배 적응지역</h1><br><img src="./img/신동진재배지역.jpg">`, `<h1>오대</h1><br><img src="./img/오대.jpg" style="height:150px;width:450px;"><br><h1>재배 적응지역</h1><br><img src="./img/오대재배지역.jpg">`]
selectBedSoil = [0, 0, 0, 0];
selectBedSoilSum = 0;
isSelectBedSoil = true;
isBedSoilCreateComplete = false;
plantingCnt = 0;
riceGrowthGraph = 1 // 최대 8단계 생장일
GrowthPhase = ["", "이앙기", "활착기", "분얼성기", "무효분얼기", "수잉기", "출수기", "등숙기", "낙수기"];
waterHeight = 0;
waterRecord = [0, 0, 0, 0, 0, 0, 0, 0];
waterMinScore = [2, 5, 2, 0, 2, 3, 2, 0];
waterMaxScore = [3, 7, 3, 0, 4, 4, 3, 0];
waterScore = [0, 0, 0, 0, 0, 0, 0, 0]; 
waterScoreSum = 0;
harvestingCnt = 0;
let convert = {"벼": "현미", "현미": "백미"};
let convertCnt = 0;
let ssrRice = 0;
let srRice = 0;
let rRice = 0; 
let nRice = 0;
let basicRice = 9;
let ssrDrawPercent = 0;
let srDrawPercent = 0;
let rDrawPercent = 0;
let money = 0;

memoClear = function() {
	document.querySelector('#memo').innerHTML = ``;
}
 
germination = function() {
	document.querySelector('#screen').innerHTML = `
	<h1 style="height: 20%">벼 종자 선택하기</h1>
	<div style="align-items: center; height: 50%">
		<div style="display:flex; height: 100%; align-items:center; justify-content: center;">
			<div><input id="selectStrainBtn1" class="btn" type="button" value="영호진미" onclick="selectStrain(1)" onmouseover="germinationMemo(1)"></div>
			<div><input id="selectStrainBtn2" class="btn" type="button" value="신동진" onclick="selectStrain(2)" onmouseover="germinationMemo(2)"></div>
			<div><input id="selectStrainBtn3" class="btn" type="button" value="오대" onclick="selectStrain(3)" onmouseover="germinationMemo(3)"><div>	
		</div>
	</div>
	`
} 

germinationMemo = function(index) {
	document.querySelector('#memo').innerHTML = `
		${strainInfo[index-1]}
	`
}

selectStrain = function(index) {
	memoClear();
	strain = document.querySelector(`#selectStrainBtn${index}`).value;
	document.querySelector("#screen").innerHTML = `<br><br><br><b>선택된 종자</b> : ${strain}<br><br><br><br><br><br><br><input type="button" value="상토 배합하기" class="btn" onclick="bedSoil()">`;
}

bedSoilCreate = function(index) {
	if(isSelectBedSoil) {
		selectBedSoil[index-1] += 5;
		selectBedSoilSum += 5;
		document.querySelector(`.bedSoilCreate${index}`).innerHTML = `${selectBedSoil[index-1]}%`;
		document.querySelector('.bedSoilCreateSum').innerHTML = `<b>합계</b> : ${selectBedSoilSum}%`;
	}
	if(selectBedSoilSum >= 100) {
		isSelectBedSoil = false;
		isBedSoilCreateComplete = true;
	}
}

bedSoilCreateClear = function(){
	isSelectBedSoil = true;
	isBedSoilCreateComplete = false;
	selectBedSoil = [0, 0, 0, 0];
	selectBedSoilSum = 0;
	document.querySelector(`.bedSoilCreate1`).innerHTML = `${selectBedSoil[0]}%`;
	document.querySelector(`.bedSoilCreate2`).innerHTML = `${selectBedSoil[1]}%`;
	document.querySelector(`.bedSoilCreate3`).innerHTML = `${selectBedSoil[2]}%`;
	document.querySelector(`.bedSoilCreate4`).innerHTML = `${selectBedSoil[3]}%`;
	document.querySelector('.bedSoilCreateSum').innerHTML = `<b>합계</b> : ${selectBedSoilSum}%`;
}

bedSoil = function() {
	memoClear();
	document.querySelector("#screen").innerHTML = `
		<h1>상토 배합</h1><br><br><br>
		<div style="display:flex; justify-content: center;">
			<div><input type="button" value="부엽토" class="btn" onclick="bedSoilCreate(1)"></div>
			<div><input type="button" value="발효퇴비" class="btn" onclick="bedSoilCreate(4)"></div>
			<div><input type="button" value="모래" class="btn" onclick="bedSoilCreate(2)"></div>
			<div><input type="button" value="재" class="btn" onclick="bedSoilCreate(3)"></div>
			<div><input type="button" value="초기화" class="btn" onclick="bedSoilCreateClear()" style="background-color:orange;"></div>
			<div><input type="button" value="확인" class="btn" onclick="bedSoilCreateComplete()" style="background-color:red;"></div>
		</div>
		<div class="bedSoilCreate">
			<div style="display:flex; justify-content: center;">
				<style="height:30px; width:30px;" src="./img/bedSoil1.jpg">
				<div>부엽토 :&nbsp</div>
				<div class="bedSoilCreate1">0%</div>
			</div>
			<div style="display:flex; justify-content: center;">
				<img style="height:30px; width:30px;" src="./img/bedSoil4.jpg">
				<div>발효퇴비 :&nbsp</div>
				<div class="bedSoilCreate4">0%</div>
			</div>
			<div style="display:flex; justify-content: center;">
				<img style="height:30px; width:30px;" src="./img/bedSoil2.jpg">
				<div>모래 :&nbsp</div>
				<div class="bedSoilCreate2">0%</div>
			</div>
			<div style="display:flex; justify-content: center;">
				<img style="height:30px; width:30px;" src="./img/bedSoil3.jpg">
				<div>재 :&nbsp</div>
				<div class="bedSoilCreate3">0%</div>
			</div>
			<div style="display:flex; justify-content: center;">
				<div class="bedSoilCreateSum"><b>합계</b> :&nbsp${selectBedSoilSum}%</div>
			</div>
		</div>
	`;
	document.querySelector('#memo').innerHTML = `<h1>상토 배합 조건</h1><br>&nbsp&nbsp&nbsp부엽토 > 발효퇴비 > 모래 = 재`;
}

bedSoilCreateComplete = function() {
	if(isBedSoilCreateComplete) {
		bedSoilAnswer = [50, 10, 10, 30];
		for(i=0 ; i<4 ; i++) {
			x = Math.abs(selectBedSoil[i] - bedSoilAnswer[i])/5;
			if(x > 5) x = 5;
			BedSoilScore += 25 - x*5;	
		}
		document.querySelector('#screen').innerHTML = `
		${BedSoilScore}점
		<br><input type="button" value="모내기하기" class="btn" onclick="ricePlanting()">
		`;
	}
}

ricePlanting = function() {
	memoClear();
	plantingPercent = BedSoilScore;
	document.querySelector('#screen').innerHTML = `
	<h1 style="height: 20%">모내기 (확률 : ${plantingPercent}%)</h1>
	<div style="display:flex;align-items: center; height: 50%;flex-wrap: wrap;" class="planting"></div>
	`
	for(i=0 ; i<30 ; i++){
		document.querySelector('.planting').innerHTML += `
			<div style="display:flex;width:80px;">
			<div id="plantingBtn${i}"><input type="button" value="모내기" class="btn" onclick="planting(${i})" style="width:100%">&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</div>	
			</div>
		`
	}
}

planting = function(index) {
	randInt = Math.floor(Math.random() * 11);
	if(randInt <= plantingPercent/10) document.querySelector(`#plantingBtn${index}`).innerHTML =`<img src="./img/ricePlanting.jpg" style="height:80px; width:80px;">`;
	else document.querySelector(`#plantingBtn${index}`).innerHTML =`<img src="./img/ricePlantingFail.jpg" style="height:80px; width:80px;">`;
	plantingCnt++;
	if(plantingCnt === 30) document.querySelector('#screen').innerHTML += `<input type="button" value="모내기 완료" class="btn" onclick="riceGrowth()">`
}

rGGdrawing = function(){
	for(i=0 ; i<8 ; i++) {
		if(i<riceGrowthGraph) document.querySelector('.rGG').innerHTML += `■`;
		else document.querySelector('.rGG').innerHTML += `□`;
	}
}

riceGrowth = function() {
	document.querySelector('#screen').innerHTML = `
		<div>${GrowthPhase[riceGrowthGraph]}<br><div class="rGG"></div></div>
		<div style="height: 69%;width:100%;" class="riceImg"><img src="./img/${waterHeight}cm.png" style="width:100%; height:80%;"></div>
		<div class="waterHeightDraw">물깊이 : ${waterHeight}cm</div>
		<div style="height: 20%; width:100%">
			<input type="button" value="+" class="btn" onclick="water(0)">
			<input type="button" value="-" class="btn" onclick="water(1)">
			<input type="button" value="설정 완료" class="btn" onclick="waterSelect()">
		<div>
	`;
	
	document.querySelector('#memo').innerHTML = `<img src="src/생육단계별 물깊이.bmp" style="width:100%; height:100%">`
	rGGdrawing();
}

water = function(idx) {
	if(idx === 0) {
		if(waterHeight < 7) waterHeight ++;
	}
	else {
		if(waterHeight > 0) waterHeight--;
	}
	document.querySelector('.riceImg').innerHTML = `<img src="./img/${waterHeight}cm.png" style="width:100%; height:80%;">`;
	document.querySelector('.waterHeightDraw').innerHTML = `물깊이 : ${waterHeight}cm`;
}

waterScoreCal = function() {
	for(i=0 ; i<8 ; i++) {
		if(waterMinScore[i] <= waterRecord[i] && waterRecord[i] <= waterMaxScore[i]) {
			waterScore[i] = 100;
		}else {
			a = Math.abs(waterMinScore[i] - waterRecord[i]);
			b = Math.abs(waterMaxScore[i] - waterRecord[i]);
			c = a < b ? a : b;
			waterScore[i] = 100 - 14 * c;
		}
		waterScoreSum += waterScore[i];
	}
}

waterSelect = function() {
	waterRecord[riceGrowthGraph-1] = waterHeight;
	riceGrowthGraph++;
	waterHeight = 0;
	riceGrowth();
	if(riceGrowthGraph === 9) {
		document.querySelector("#screen").innerHTML = `
			<div style="text-align: center;"><h1>벼 생장 기록</h1></div>	
			<div class="record"></div>	
		`;
		document.querySelector('#memo').innerHTML = `<img src="./src/생육단계별 물깊이(정답).bmp" style="width:100%; height:100%">`
		waterScoreCal();
		for(i=1 ; i<9 ; i++) {
			document.querySelector(".record").innerHTML += `${GrowthPhase[i]} : ${waterScore[i-1]}점 // 물깊이: ${waterRecord[i-1]}cm<br>`; 
		}
		document.querySelector(".record").innerHTML += `총점 : ${waterScoreSum} / 800 (점)<br><input type="button" class="btn" value="추수하기" onclick="harvest()">`;
	}
}

harvest = function() {
	memoClear();
	document.querySelector('#screen').innerHTML = `
	<h1 style="height: 20%">추수</h1>
	<div style="display:flex;align-items: center; height: 50%;flex-wrap: wrap;" class="harvesting"></div>
	`;
	for(i=0 ; i<30 ; i++){
		document.querySelector('.harvesting').innerHTML += `
			<div style="display:flex;width:80px;">
				<div id="harvestingImg${i}"><img onclick="harvesting(${i})" src="./img/riceHarvesting.jpg" style="height:80px; width:80px;"></div>
			</div>`;
	}
}

harvesting = function(index) {
	document.querySelector(`#harvestingImg${index}`).innerHTML =`<input type="button" class="btn" value="추수" style="height:80px; width:80px;">`;
	harvestingCnt++;
	if(harvestingCnt=== 30) document.querySelector('#screen').innerHTML += `<input type="button" value="추수 완료" class="btn" onclick="milling()">`;
}

milling = function() {
	document.querySelector("#screen").innerHTML = `<h3>도정</h3>`
	document.querySelector("#memo").innerHTML = `<h3>도정이란?</h3><br>도정이란 작물의 겉껍질인 왕겨와 속껍질인 겨층을 벗겨내 먹을 수 있게끔<br> 가공하는 것을 말한다.<br><br><a href="https://terms.naver.com/entry.naver?docId=5782158&cid=62861&categoryId=62861" target="_blank" style="text-decoration: none;">더 알아보기</a>`;
	document.querySelector("#screen").innerHTML += `   
	<div style="display:flex;">
		<div style="width:50%; height:80%; display:flex; flex-wrap: wrap" class="dragStart" id="drag">
		</div>
		<div style="width:50%; height:80%; display:flex; padding-top: 15%; justify-content: center;">
			>>
     			<div id="box" ondrop="drop(event)" ondragover="allowDrop(event)"><img src="./img/도정기.jpg" style="width:100%;height:100%;"></div>
		</div>
	</div>
	<div class="completeMilling"></div>
	`;
	for(i=0 ; i<9 ; i++) {
		document.querySelector('.dragStart').innerHTML += `<img id="rice${i}" data-id="벼" src="./img/벼.png" draggable="true" ondragstart="drag(event)" style="width:80px;height:80px;display:inline;padding:20px;">`;	
	}
}

function allowDrop(ev)    
            {    
                ev.preventDefault();    
            }    
    
            function drag(ev)    
            {    
                ev.dataTransfer.setData("text", ev.target.id);    
            }    
    
            function drop(ev)    
            {    
	   convertCnt++;
                ev.preventDefault();    
                var data = ev.dataTransfer.getData("text");
                let element = document.getElementById(data);
                let parent = document.getElementById("drag");
                parent.removeChild(element);
                element.setAttribute('data-id', convert[element.getAttribute("data-id")]);
                element.src = `img/${element.getAttribute("data-id")}.png`;
                if (element.getAttribute("data-id") === "백미") element.setAttribute("draggable", false);
                parent.appendChild(element);
	   if(convertCnt === 18) {
	   	document.querySelector('.completeMilling').innerHTML = `<input type="button" class="btn" value="도정 완료" onclick="sellRice()">`
	   }
            }    
function sellRice() {
	ssrDrawPercent = Math.floor((BedSoilScore + waterScoreSum)/60);
	srDrawPercent = Math.floor(ssrDrawPercent + (100-ssrDrawPercent)/4)
	rDrawPercent = Math.floor(srDrawPercent + (100-srDrawPercent)/3);

	document.querySelector('#memo').innerHTML = ``;
	document.querySelector('#screen').innerHTML = `
		획득한 백미:<br>
		<img src="./img/SSR.jpg" class="grade"> X ${ssrRice}개 (${ssrDrawPercent}%)<br>
		<img src="./img/SR.jpg" class="grade"> X ${srRice}개 (${srDrawPercent-ssrDrawPercent}%)<br>
		<img src="./img/R.jpg" class="grade"> X ${rRice}개 (${rDrawPercent-srDrawPercent}%)<br>
		<img src="./img/N.jpg" class="grade"> X ${nRice}개 (${100-rDrawPercent}%)<br>
		<input type="button" class="btn" value="백미 뽑기" onclick="drawRice()">&nbsp남은 백미 : ${basicRice}개
		<div class="lastStep"></div>
	`;
}

function drawRice() {
	if(basicRice === 0) document.querySelector('.lastStep').innerHTML = `<input type="button" class="btn" value="판매" onclick="lastSell()">`;
	else {
		basicRice--;
		let x = Math.floor(Math.random() * 100) + 1;
		if(x <= ssrDrawPercent) ssrRice++;
		else if(x <= srDrawPercent) srRice++;
		else if(x <= rDrawPercent) rRice++;
		else nRice++;
		sellRice();
		if(basicRice === 0) document.querySelector('.lastStep').innerHTML = `<input type="button" class="btn" value="판매" onclick="lastSell()">`;
	}
}

function lastSell() {
	document.querySelector('#screen').innerHTML = `판매`;
	document.querySelector('#screen').innerHTML = `
		보유중인 백미:<br>
		<img src="./img/SSR.jpg" class="grade"> X ${ssrRice}개&nbsp<input type="button" class="btn" value="판매" onclick="soldRice(1)"><br>
		<img src="./img/SR.jpg" class="grade"> X ${srRice}개&nbsp<input type="button" class="btn" value="판매" onclick="soldRice(2)"><br>
		<img src="./img/R.jpg" class="grade"> X ${rRice}개&nbsp<input type="button" class="btn" value="판매" onclick="soldRice(3)"><br>
		<img src="./img/N.jpg" class="grade"> X ${nRice}개&nbsp<input type="button" class="btn" value="판매" onclick="soldRice(4)"><br>
	`;
}

function soldRice(idx) {
	if(idx === 1) {
		if(ssrRice !== 0) {
			ssrRice--;
			lastSell();
			money += 40000;
		}
	}else if(idx === 2) {
		if(srRice !== 0) {
			srRice--;
			lastSell();
			money += 30000;
		}
	}else if(idx === 3) {
		if(rRice !== 0) {
			rRice--;
			lastSell();
			money += 20000;
		}
	}else {
		if(nRice !== 0) {
			nRice--;
			lastSell();
			money += 10000;
		}
	}
	if(ssrRice + srRice + rRice + nRice === 0) {
		lastSell();
		document.querySelector('#screen').innerHTML += `<input type="btn" value="종료" class="btn" onclick="ending()">`
	}
}

ending = function() {
	document.querySelector('#screen').innerHTML = `score : ${money} / 360000`;
}
