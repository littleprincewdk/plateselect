#X-plateselect 一款好看的select插件

	<div class="XPlateSelect-wrapper" style="left:200px;top:100px;">
    <div class="XPlateSelect-btn"></div>
    <div class="XPlateSelect-plate">
        <div class="XPlateSelect-option" data-value="臧雪野"><span>臧雪野</span></div>
        <div class="XPlateSelect-option" data-value="杨渊策"><span>杨渊策</span></div>
        <div class="XPlateSelect-option" data-value="武登科"><span>武登科</span></div>
        <!--<div class="XPlateSelect-option" data-value="葛轩"><span>葛轩</span></div>
        <div class="XPlateSelect-option" data-value="韩清无"><span>韩清无</span></div>
        <div class="XPlateSelect-option" data-value="栗小羊"><span>栗小羊</span></div>-->
    </div>
	</div>
	<script src="bower_components/jquery/dist/jquery.min.js"></script>
	<script src="dist/Xplateselect.js"></script>
	<script>
		$(function(){
			var Plate=$(".XPlateSelect-wrapper").XPlateSelect({
				value:"武登科"
			});
			Plate.Plate.on("change",function(){
				alert(Plate.getValue())
			});
		})
	</script>