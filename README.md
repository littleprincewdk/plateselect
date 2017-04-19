X-plateselect 好看的select插件
-
[demo](http://princekin.tjxuechuang.com/projects/xplateselect/index.html)

	<div class="XPlateSelect-wrapper" style="left:200px;top:100px;">
    <div class="XPlateSelect-btn"></div>
    <div class="XPlateSelect-plate">
        <div class="XPlateSelect-option" data-value="�ѩҰ"><span>�ѩҰ</span></div>
        <div class="XPlateSelect-option" data-value="��Ԩ��"><span>��Ԩ��</span></div>
        <div class="XPlateSelect-option" data-value="��ǿ�"><span>��ǿ�</span></div>
        <!--<div class="XPlateSelect-option" data-value="����"><span>����</span></div>
        <div class="XPlateSelect-option" data-value="������"><span>������</span></div>
        <div class="XPlateSelect-option" data-value="��С��"><span>��С��</span></div>-->
    </div>
	</div>
	<script src="bower_components/jquery/dist/jquery.min.js"></script>
	<script src="dist/Xplateselect.js"></script>
	<script>
		$(function(){
			var Plate=$(".XPlateSelect-wrapper").XPlateSelect({
				value:"��ǿ�"
			});
			Plate.Plate.on("change",function(){
				alert(Plate.getValue())
			});
		})
	</script>