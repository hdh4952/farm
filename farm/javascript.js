strain = "";

germination = function() {
	document.querySelector('#screen').innerHTML = `
	<h1 style="height: 20%">벼 종자 선택하기</h1>
	<div style="align-items: center; height: 50%">
		<div style="display:flex; height: 100%; align-items:center; justify-content: center;">
			<div><input id="selectStrainBtn1" class="btn" type="button" value="영호진미" onclick="selectStrain(1)"></div>
			<div><input id="selectStrainBtn2" class="btn" type="button" value="신동진" onclick="selectStrain(2)"></div>
			<div><input id="selectStrainBtn3" class="btn" type="button" value="오대" onclick="selectStrain(3)"><div>	
		</div>
	</div>
	`
} 

selectStrain = function(index) {
	strain = document.querySelector(`#selectStrainBtn${index}`).value;
	document.querySelector("#screen").innerHTML = `선택된 종자 : ${strain}`;
}