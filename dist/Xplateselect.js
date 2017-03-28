/**
 * Created by wudengke on 2017/2/27.
 */
$(function(){
    window.console = window.console || {};
    console.log || (console.log = opera.postError);
    function XPlateSelect(dom,settings){
        var _self=this;
        _self.defaults={
            value:"",
            useBgColor:true,
            bgColor:["#d5a7ff","#80abf4","#a4f4be","#43f1f4","#f4ee68","#d0f4a0"]
        };
        $.extend(true,_self.defaults,settings);
        settings=_self.defaults;
        _self.Wrapper=$(dom);
        _self.Btn=_self.Wrapper.children(".XPlateSelect-btn");
        _self.Plate=_self.Wrapper.children(".XPlateSelect-plate");
        _self.Options=_self.Plate.find(".XPlateSelect-option");
        var Plate_size={width:150,height:150},
            Plate_offset=_self.Plate.offset(),
            Btn_size={width:40,height:40},
            centerPoint={x:Plate_offset.left+Plate_size.width/2,y:Plate_offset.top+Plate_size.height/2};
        var option_num=_self.Options.length;

        if(option_num>6||option_num<2){
            console.warn("XPlateSelect:","option个数不合法");
            return;
        }
        var style=[];
        for(var i=0;i<option_num;i++){
            var _angle=0;
            if(option_num>3){
                _angle=270/(option_num-1);
                if(i==0){
                    style[i]={
                        css:{
                            "border-bottom-color":settings.bgColor[i],
                            "z-index":1
                        },
                        rotate:0,
                        angle:[-45,45]
                    }
                }else{
                    style[i]={
                        css:{
                            "border-bottom-color":settings.bgColor[i]
                        },
                        rotate:90+(i-1)*_angle,
                        angle:[45+(i-1)*_angle,45+i*_angle]
                    }
                }
            }else if(option_num==3){
                _angle=90;
                if(i==0){
                    style[i]={
                        css:{
                            "border-bottom-color":settings.bgColor[i],
                            "border-right-color":settings.bgColor[i],
                            "z-index":1
                        },
                        rotate:45,
                        angle:[-90,90]
                    }
                }else{
                    style[i]={
                        css:{
                            "border-bottom-color":settings.bgColor[i]
                        },
                        rotate:45+i*_angle,
                        angle:[90+(i-1)*_angle,90+i*_angle]
                    }
                }
            }else if(option_num==2){
                _angle=180;
                if(i==0){
                    style[i]={
                        css:{
                            "border-bottom-color":settings.bgColor[i],
                            "border-right-color":settings.bgColor[i]
                        },
                        rotate:45,
                        angle:[-90,90]
                    }
                }else{
                    style[i]={
                        css:{
                            "border-bottom-color":settings.bgColor[i],
                            "border-right-color":settings.bgColor[i]
                        },
                        rotate:225,
                        angle:[90,270]
                    }
                }

            }
        }

        //设置样式
        for( var i=0;i<option_num;i++){
            var option=style[i],angle=(option.angle[0]+option.angle[1])/2/180*Math.PI;
            //option样式
            if(settings.useBgColor){
                option.css["transform"]="rotate("+option.rotate+"deg)";
                $(_self.Options.get(i)).css(option.css);
            }else{
                $(_self.Options.get(i)).css({
                    "transform":"rotate("+option.rotate+"deg)"
                });
                _self.Options.addClass("XPlateSelect-option-cutoff");
            }
            //span样式
            var Span=$(_self.Options.get(i)).children("span").appendTo(_self.Wrapper);
            var Span_width=Span.width(),
                Span_height=Span.height();
            if(option.angle[1]-option.angle[0]==180){//180度时放在2/3处
                var left=Btn_size.width/2-Math.sin(angle)*Plate_size.width/4-Span_width/2,
                    top =Btn_size.height/2+Math.cos(angle)*Plate_size.width/4-Span_height/2;
            }else{//其他放在1/2处
                var left=Btn_size.width/2-Math.sin(angle)*Plate_size.width/3-Span_width/2,
                    top =Btn_size.height/2+Math.cos(angle)*Plate_size.width/3-Span_height/2;
            }

            Span.css({
                left:left,
                top:top
            })
        }

        _self.Spans=_self.Wrapper.children("span");

        var count=0;
        _self.Options.each(function(i,ele){
            if(settings.value==$(ele).attr("data-value")){
                outstandOption(i);
                count++;
            }
        });
        if(count>1){
            console.warn("XPlateSelect:","value重复");
        }

        _self.Plate.hide();
        _self.Spans.hide();

        _self.Wrapper.on("mousedown",function(e){
            _self.Plate.show();
            _self.Spans.show();
        }).on("mouseup",function(e){
            if(e.target.getAttribute("class")!="XPlateSelect-btn"){//不是在btn上
                selectOption(e);
            }
            _self.Plate.hide();
            _self.Spans.hide();
        }).on("mousemove",function(e){
              if(e.target.getAttribute("class")!="XPlateSelect-btn"){//不是在btn上
                  outstandOption(calcOnWhichOption(e));
              }
        }).on("mouseleave",function(e){
            _self.Plate.hide();
            _self.Spans.hide();
        });
        _self.getValue=function(){return settings.value};
        

        function calcOnWhichOption(e){
            var _x=e.clientX-centerPoint.x,
                _y=e.clientY-centerPoint.y;
            var sin=Math.abs(_x/Math.sqrt(_x*_x+_y*_y));
            var asin=Math.asin(sin);
            var angle=asin*180/Math.PI;
            if(_x<0){
                if(_y<0){
                    angle=180-angle;
                }
            }else{
                if(_y<0){
                    angle+=180;
                }else{
                    angle=360-angle;
                }
            }
            var index=0;
            for( var i=0,length=style.length;i<length;i++){
                if(settings.useBgColor){
                    $(_self.Options.get(i)).css("transform","").css(style[i].css);
                }else{
                    $(_self.Options.get(i)).css({
                        "transform":"rotate("+option.rotate+"deg)"
                    });
                   // _self.Options.addClass("XPlateSelect-option-cutoff");
                }


                var _angle=angle;
                if(style[i].angle[0]<0&&angle>270){
                    _angle=_angle-360;
                }
                if(_angle>style[i].angle[0]&&_angle<=style[i].angle[1]){
                    index=i;
                }
            }
            return index;
        }
        function outstandOption(index){
            if(option_num>4){//背景色改变
                $(_self.Options.get(index)).css("border-bottom-color","#008000");
            }else{//变大效果
                var transform=style[index].css["transform"];
                if(transform){
                    $(_self.Options.get(index)).css("transform",transform+" scale(1.2)");
                }else{
                    $(_self.Options.get(index)).css("transform","scale(1.2)");
                }
            }
        }
        function selectOption(e){
            var index=calcOnWhichOption(e);
            if(settings.value!=$(_self.Options.get(index)).attr("data-value")){
                //触发值改变回调事件
                settings.value=$(_self.Options.get(index)).attr("data-value");
                _self.Plate.trigger("change");
            }
            outstandOption(index);
        }
        function togglePlate(){
            _self.Plate.toggle();
            _self.Spans.toggle();
        }
    }
    $.fn.extend({
        XPlateSelect:function(settings){return new XPlateSelect(this,settings)}
    })
});