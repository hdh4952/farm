strain = "";
strainInfo = ["영호진미", "신동진", `<h1>오대</h1><br><img src="img/오대.jpg" style="height:150px;width:450px;"><br><h1>재배 적응지역</h1><br><img src="img/오대재배지역.jpg">`]

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

selectBedSoil1 = 0;
selectBedSoil2 = 0;
selectBedSoil3 = 0;
selectBedSoil4 = 0;
bedSoilCreate = function(index) {
	switch(index) {
		case 1: selectBedSoil1 += 5;
		case 2: selectBedSoil2 += 5;
		case 3: selectBedSoil3 += 5;
		case 4: selectBedSoil4 += 5;
	}
	document.querySelector(`.bedSoilCreate${index}`).innerHTML = `<img style="height:30px; width:30px;" src="img/bedSoil${index}.jpg">`;
}

bedSoil = function() {
	memoClear();
	document.querySelector("#screen").innerHTML = `
		<h1>상토 배합</h1><br><br><br>
		<div style="display:flex; justify-content: center;">
			<div><input type="button" value="부엽토" class="btn" onclick="bedSoilCreate(1)"></div>
			<div><input type="button" value="모래" class="btn" onclick="bedSoilCreate(2)"></div>
			<div><input type="button" value="재" class="btn" onclick="bedSoilCreate(3)"></div>
			<div><input type="button" value="발효퇴비" class="btn" onclick="bedSoilCreate(4)"></div>
		</div>
		<div class="bedSoilCreate">
			<div class="bedSoilCreate1"><img style="height:30px; width:30px;" src="img/bedSoil1.jpg">0%</div>
			<div class="bedSoilCreate2"><img style="height:30px; width:30px;" src="img/bedSoil2.jpg">0%</div>
			<div class="bedSoilCreate3"><img style="height:30px; width:30px;" src="img/bedSoil3.jpg">0%</div>
			<div class="bedSoilCreate4"><img style="height:30px; width:30px;" src="img/bedSoil4.jpg">0%</div>
		</div>
	`;
	document.querySelector('#memo').innerHTML = `<h1>상토 배합 조건</h1><br>&nbsp&nbsp&nbsp부엽토 > 발효퇴비 > 모래 = 흙`;
}