var timer = 'pause(100); \n'

Blockly.JavaScript['minecraft_wait_a_fn'] = function(block){
    return "await ";
}

Blockly.JavaScript['minecraft_drone_x'] = function(a) {
    a = Number(a.getFieldValue("drone_coord_x"));
    return [a, 0 <= a ? Blockly.JavaScript.ORDER_ATOMIC : Blockly.JavaScript.ORDER_UNARY_NEGATION]
}

Blockly.JavaScript['minecraft_drone_y'] = function(a) {
    a = Number(a.getFieldValue("drone_coord_y"));
    return [a, 0 <= a ? Blockly.JavaScript.ORDER_ATOMIC : Blockly.JavaScript.ORDER_UNARY_NEGATION]
}

Blockly.JavaScript['minecraft_drone_z'] = function(a) {
    a = Number(a.getFieldValue("drone_coord_z"));
    return [a, 0 <= a ? Blockly.JavaScript.ORDER_ATOMIC : Blockly.JavaScript.ORDER_UNARY_NEGATION]
}

Blockly.JavaScript['minecraft_player_x'] = function(a) {
    a = Number(a.getFieldValue("player_coord_x"));
    return [a, 0 <= a ? Blockly.JavaScript.ORDER_ATOMIC : Blockly.JavaScript.ORDER_UNARY_NEGATION]
}

Blockly.JavaScript['minecraft_player_y'] = function(a) {
    a = Number(a.getFieldValue("player_coord_y"));
    return [a, 0 <= a ? Blockly.JavaScript.ORDER_ATOMIC : Blockly.JavaScript.ORDER_UNARY_NEGATION]
}

Blockly.JavaScript['minecraft_player_z'] = function(a) {
    a = Number(a.getFieldValue("player_coord_z"));
    return [a, 0 <= a ? Blockly.JavaScript.ORDER_ATOMIC : Blockly.JavaScript.ORDER_UNARY_NEGATION]
}

Blockly.JavaScript['minecraft_nearfront'] = function(a) {
    a = String(a.getFieldValue("near_block_front"));
    return ['\''+a+'\'', 'null' <= a ? Blockly.JavaScript.ORDER_ATOMIC : Blockly.JavaScript.ORDER_UNARY_NEGATION]
}

Blockly.JavaScript['minecraft_nearbehind'] = function(a) {
    a = String(a.getFieldValue("near_block_behind"));
    return ['\''+a+'\'', 'null' <= a ? Blockly.JavaScript.ORDER_ATOMIC : Blockly.JavaScript.ORDER_UNARY_NEGATION]
}

Blockly.JavaScript['minecraft_nearright'] = function(a) {
    a = String(a.getFieldValue("near_block_right"));
    return ['\''+a+'\'', 'null' <= a ? Blockly.JavaScript.ORDER_ATOMIC : Blockly.JavaScript.ORDER_UNARY_NEGATION]
}

Blockly.JavaScript['minecraft_nearleft'] = function(a) {
    a = String(a.getFieldValue("near_block_left"));
    return ['\''+a+'\'', 'null' <= a ? Blockly.JavaScript.ORDER_ATOMIC : Blockly.JavaScript.ORDER_UNARY_NEGATION]
}

Blockly.JavaScript['minecraft_checkblockdronedata'] = function(a) {
    a = String(a.getFieldValue("scheckblockdronedata"));
    return ['\''+a+'\'', 'null' <= a ? Blockly.JavaScript.ORDER_ATOMIC : Blockly.JavaScript.ORDER_UNARY_NEGATION]
}

Blockly.JavaScript['minecraft_getchat'] = function(a) {
    a = String(a.getFieldValue("player_chat"));
    return ['\''+a+'\'', 'null' <= a ? Blockly.JavaScript.ORDER_ATOMIC : Blockly.JavaScript.ORDER_UNARY_NEGATION]
}



Blockly.JavaScript['minecraft_connect'] = function (block) {
    var text_nickname = NickName ||'test_nick';
    var checkbox_world = block.getFieldValue('world') === 'TRUE';
    var checkbox_mob = block.getFieldValue('mob') === 'TRUE';

    var base_url = 'https://server.x1team.ru:8088/cmd?name='+text_nickname+'/connect';
    var url = base_url + '/' + checkbox_world + '/' + checkbox_mob;

    var code = timer+' await ( await fetch (\'' + url + '\')).text();\n';
    return code;
};

Blockly.JavaScript['minecraft_build'] = function (block) {
    var text_nickname = NickName;   
    var dir = block.getFieldValue('dir');
    var blocktype = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('blocktype'), Blockly.VARIABLE_CATEGORY_NAME);
    var base_url = 'https://server.x1team.ru:8088/cmd?name='+text_nickname+'/build';

    var url = base_url + '/creative/\'+' + blocktype + '+\'/'+dir;
    var code = timer+' await ( await fetch (\'' + url + '\')).text();\n';

    return code;
};


Blockly.JavaScript['minecraft_moveDrone'] = function (block) {
    var text_nickname = NickName;
    var type = block.getFieldValue('Type');
    var step =  block.getField("step") ? String(Number(block.getFieldValue("step"))) : Blockly.JavaScript.valueToCode(block, "step", Blockly.JavaScript.ORDER_ASSIGNMENT) || "0"   ;
	
    if(/^(0|-?[1-9]\d{0,5})$/.test(step) == false)
	step = '\'+'+ step + '+\'';
    var base_url = 'https://server.x1team.ru:8088/cmd?name='+text_nickname+'/move';
    var url = base_url + '/' + type + '/' + step;
    var code = timer+' await ( await fetch (\'' + url + '\')).text();\n';
    return code;
};

Blockly.JavaScript['minecraft_botToPlayer'] = function (block) {
    var text_nickname = NickName;
    var type = block.getFieldValue('Type');
    var base_url = 'https://server.x1team.ru:8088/cmd?name='+text_nickname+'/botToPlayer';
    var url = base_url + '/' + type;
    var code = timer+' await ( await fetch (\'' + url + '\')).text();\n';
    return code;
};

Blockly.JavaScript['minecraft_tpdrone'] = function (block) {
    var text_nickname = NickName;
    var number_x =  block.getField("tpdrone_x") ? String(Number(block.getFieldValue("tpdrone_x"))) : Blockly.JavaScript.valueToCode(block, "tpdrone_x", Blockly.JavaScript.ORDER_ASSIGNMENT) || "0"   ;
    var number_y =  block.getField("tpdrone_y") ? String(Number(block.getFieldValue("tpdrone_y"))) : Blockly.JavaScript.valueToCode(block, "tpdrone_y", Blockly.JavaScript.ORDER_ASSIGNMENT) || "0"   ;
    var number_z =  block.getField("tpdrone_z") ? String(Number(block.getFieldValue("tpdrone_z"))) : Blockly.JavaScript.valueToCode(block, "tpdrone_z", Blockly.JavaScript.ORDER_ASSIGNMENT) || "0"   ;
    
    if(/^(0|-?[1-9]\d{0,5})$/.test(number_x) == false)
	 number_x = '\'+'+ number_x + '+\'';
    if(/^(0|-?[1-9]\d{0,5})$/.test(number_y) == false)
         number_y = '\'+'+ number_y + '+\'';
    if(/^(0|-?[1-9]\d{0,5})$/.test(number_z) == false)
         number_z = '\'+'+ number_z + '+\'';
    
    var base_url = 'https://server.x1team.ru:8088/cmd?name='+text_nickname+'/tpbot';
    var url = base_url + '/' + number_x + '/' + number_y + '/' + number_z;
    var code = timer+' await ( await fetch (\'' + url + '\')).text();\n';

    return code;
};

Blockly.JavaScript['minecraft_summon'] = function (block) {
    var text_nickname = NickName;
    var type = block.getFieldValue('Type');

    var base_url = 'https://server.x1team.ru:8088/cmd?name='+text_nickname+'/summon';
    var url = base_url + '/' + type;
    var code = timer+' await ( await fetch (\'' + url + '\')).text();\n';

    return code;
};


Blockly.JavaScript['minecraft_time'] = function (block) {
    var text_nickname = NickName;
    var time = block.getFieldValue('time');

    var base_url = 'https://server.x1team.ru:8088/cmd?name='+text_nickname+'/setTime';
    var url = base_url + '/' + time;
    var code = ' await ( await fetch (\'' + url + '\')).text();\n';

    return code;
};

Blockly.JavaScript['minecraft_weather'] = function (block) {
    var text_nickname = NickName;
    var type = block.getFieldValue('Type');
    var duration = block.getFieldValue('duration');

    var base_url = 'https://server.x1team.ru:8088/cmd?name='+text_nickname+'/setWeather';
    var url = base_url + '/' + type + '/' + duration;
    var code = ' await ( await fetch (\'' + url + '\')).text();\n';

    return code;
};

Blockly.JavaScript['minecraft_text'] = function (block) {
    var text_nickname = NickName;
    var color = block.getFieldValue('color');
    var mtexts =  block.getField("mctext") ? String(Number(block.getFieldValue("mctext"))) : Blockly.JavaScript.valueToCode(block, "mctext", Blockly.JavaScript.ORDER_ASSIGNMENT) || "0"   ;
	
    var base_url = 'https://server.x1team.ru:8088/cmd?name='+text_nickname+'/text';
    var url = base_url + '/' + color + '/' + mtexts.replace("'","").replace("'","");
    var code = timer+' await ( await fetch (\'' + url + '\')).text();\n';

    return code;
};


Blockly.JavaScript['minecraft_mineblock'] = function (block) {
    var text_nickname = NickName;

    var base_url = 'https://server.x1team.ru:8088/cmd?name='+text_nickname+'/mine';
    var url = base_url;
    var code = timer+' await ( await fetch (\'' + url + '\')).text();\n';
    return code;
};

Blockly.JavaScript['minecraft_craft'] = function (block) {
    var text_nickname = NickName;
    var item = block.getFieldValue('item');	
    var count = block.getFieldValue('count');
	
    var base_url = 'https://server.x1team.ru:8088/cmd?name='+text_nickname+'/craft';
    var url = base_url + '/' + item + '/'+ count;
    var code = timer+' await ( await fetch (\'' + url + '\')).text();\n';
    return code;
};

Blockly.JavaScript['minecraft_playnote'] = function (block) {
    var text_nickname = NickName;
    var octave = block.getFieldValue('octave');	
    var tone = block.getFieldValue('tone');	
    var instr = block.getFieldValue('instrument');
	
    var base_url = 'https://server.x1team.ru:8088/cmd?name='+text_nickname+'/playNote';
    var url = base_url + '/' + octave + '/'+ tone+ '/'+ instr;
    var code = ' await ( await fetch (\'' + url + '\')).text();\n';
    return code;
};

Blockly.JavaScript['minecraft_if'] = function (block) {
    var text_nickname = NickName;
    var whatif = block.getFieldValue('whatif');
    var valif = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('valif'), Blockly.VARIABLE_CATEGORY_NAME);
    var whatthen = block.getFieldValue('whatthen');
    var valthen = block.getFieldValue('valthen');
	
    var base_url = 'https://server.x1team.ru:8088/cmd?name='+text_nickname+'/if';
    var url = base_url + '/' + whatif + '/\'+'+ valif+ '+\'/'+ whatthen + '/'+ valthen;
    var code = timer+' await ( await fetch (\'' + url + '\')).text();\n';
    return code;
};

Blockly.JavaScript['minecraft_movehand'] = function (block) {
    var text_nickname = NickName;
    var number_x =  block.getField("x") ? String(Number(block.getFieldValue("x"))) : Blockly.JavaScript.valueToCode(block, "x", Blockly.JavaScript.ORDER_ASSIGNMENT) || "0"   ;
    var number_y =  block.getField("y") ? String(Number(block.getFieldValue("y"))) : Blockly.JavaScript.valueToCode(block, "y", Blockly.JavaScript.ORDER_ASSIGNMENT) || "0"   ;
    var number_z =  block.getField("z") ? String(Number(block.getFieldValue("z"))) : Blockly.JavaScript.valueToCode(block, "z", Blockly.JavaScript.ORDER_ASSIGNMENT) || "0"   ;
    var what = block.getFieldValue('what');
    var type = block.getFieldValue('type');
	
    if(/^(0|-?[1-9]\d{0,5})$/.test(number_x) == false)
	 number_x = '\'+'+ number_x + '+\'';
    if(/^(0|-?[1-9]\d{0,5})$/.test(number_y) == false)
	 number_y = '\'+'+ number_y + '+\'';
    if(/^(0|-?[1-9]\d{0,5})$/.test(number_z) == false)
	 number_z = '\'+'+ number_z + '+\'';
    
    var base_url = 'https://server.x1team.ru:8088/cmd?name='+text_nickname+'/moveBotBody';
    var url = base_url + '/' + type + '/' + what + '/' + number_x + '/' + number_y + '/' + number_z;
    var code = timer+' await ( await fetch (\'' + url + '\')).text();\n';

    return code;
};

Blockly.JavaScript['minecraft_getdroneblock'] = function (block) {
     var text_nickname = NickName;	
     var otherCode = Blockly.JavaScript.statementToCode(block, 'otherCode');
     var response = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('response'), Blockly.VARIABLE_CATEGORY_NAME);
     var checkbox_bot = block.getFieldValue('bot') === 'TRUE';
  
      if(checkbox_bot==false)
	 var base_url = 'https://server.x1team.ru:8088/poll?name='+text_nickname+'/drone'
      else
	 var base_url = 'https://server.x1team.ru:8088/poll?name='+text_nickname+'/sputnik'
      var code = 'async function getVal() {\n let response = await httpGet(\'' + base_url + '\');\n return response;} (\n async () => {'+response+' = await getVal();\n'+otherCode+'\n})(); ';
      return code;
};

Blockly.JavaScript['minecraft_setBlockData'] = function (block) {
    var text_nickname = NickName;	
    var blockData =  Blockly.JavaScript.variableDB_.getName(block.getFieldValue('blockData'), Blockly.VARIABLE_CATEGORY_NAME);
	
    var base_url = 'https://server.x1team.ru:8088/cmd?name='+text_nickname+'/setblockdata';
    var url = base_url + '/\'+' + blockData + '.split("=").join("-")+\'';
    var code = timer+' await ( await fetch (\'' + url + '\')).text();\n';

    return code;
};

Blockly.JavaScript['minecraft_jsonParse'] = function (block) {	
    var string = block.getField("string") ? String(Number(block.getFieldValue("server_string"))) : Blockly.JavaScript.valueToCode(block, "server_string", Blockly.JavaScript.ORDER_ASSIGNMENT) || "0";
    var type = block.getFieldValue('type');	
    var data =  block.getField("data") ? String(Number(block.getFieldValue("data"))) : Blockly.JavaScript.valueToCode(block, "data", Blockly.JavaScript.ORDER_ASSIGNMENT) || "0"   ;
    var server_data = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('server_data'), Blockly.VARIABLE_CATEGORY_NAME);
    
    var code = server_data+'='+string+'[\''+type+'\']['+data+'];\n';
    return code;
};

Blockly.JavaScript['minecraft_coordBlock'] = function (block) {
    var x =  block.getField("x") ? String(Number(block.getFieldValue("x"))) : Blockly.JavaScript.valueToCode(block, "x", Blockly.JavaScript.ORDER_ASSIGNMENT) || "0"   ;
    var y =  block.getField("y") ? String(Number(block.getFieldValue("y"))) : Blockly.JavaScript.valueToCode(block, "y", Blockly.JavaScript.ORDER_ASSIGNMENT) || "0"   ;
    var z =  block.getField("z") ? String(Number(block.getFieldValue("z"))) : Blockly.JavaScript.valueToCode(block, "z", Blockly.JavaScript.ORDER_ASSIGNMENT) || "0"   ;
    if(/^(0|-?[1-9]\d{0,5})$/.test(x) == false)
	 x = '\'+'+ x + '+\'';
    if(/^(0|-?[1-9]\d{0,5})$/.test(y) == false)
	 y = '\'+'+ y + '+\'';
    if(/^(0|-?[1-9]\d{0,5})$/.test(z) == false)
	 z = '\'+'+ z + '+\'';
    var code = '\'block('+x+' '+y+' '+z+')\'';
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['minecraft_droneSputnik'] = function (block) {
    var text_nickname = NickName;
    var mob_type = block.getFieldValue('mob_type');	
    var checkbox_zaxvat = block.getFieldValue('zaxvat') === 'TRUE';
    var mob_name =  block.getField("mob_name") ? String(Number(block.getFieldValue("mob_name"))) : Blockly.JavaScript.valueToCode(block, "mob_name", Blockly.JavaScript.ORDER_ASSIGNMENT) || "0"   ;
    
    var base_url = 'https://server.x1team.ru:8088/cmd?name='+text_nickname+'/sputnik/create';
    var url = base_url + '/' + mob_type + '/' + mob_name.split("'").join("") + '/' + checkbox_zaxvat;
    var code = timer+' await ( await fetch (\'' + url + '\')).text();\n';
    return code;
};

Blockly.JavaScript['minecraft_momentmove'] = function (block) {
  var text_nickname = NickName;
  var dir = block.getFieldValue('dir');	
  var base_url = 'https://server.x1team.ru:8088/cmd?name='+text_nickname+'/sputnik/momentmove';
  var url = base_url+'/'+dir;
  var code = timer+' await ( await fetch (\'' + url + '\')).text();\n';
  return code;
};

Blockly.JavaScript['minecraft_sputnikCraft'] = function (block) {
  var text_nickname = NickName;
  var item = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('item'), Blockly.VARIABLE_CATEGORY_NAME);	
	
  var base_url = 'https://server.x1team.ru:8088/cmd?name='+text_nickname+'/sputnik/craft';
  var url = base_url + '/\'+' + item + '+\'/'
  var code = timer+' await ( await fetch (\'' + url + '\')).text();\n';
  return code;
};

Blockly.JavaScript['minecraft_sputnikmineblock'] = function (block) {
    var text_nickname = NickName;

    var base_url = 'https://server.x1team.ru:8088/cmd?name='+text_nickname+'/sputnik/mine';
    var url = base_url;
    var code = timer+' await ( await fetch (\'' + url + '\')).text();\n';
    return code;
};

Blockly.JavaScript['minecraft_sputnikInvSlot'] = function (block) {
  var text_nickname = NickName;
  var slot =  block.getField("slot") ? String(Number(block.getFieldValue("slot"))) : Blockly.JavaScript.valueToCode(block, "slot", Blockly.JavaScript.ORDER_ASSIGNMENT) || "0"   ;
	
  if(/^(0|-?[1-9]\d{0,5})$/.test(slot) == false)
      slot = '\'+'+ slot + '+\'';
    
  var base_url = 'https://server.x1team.ru:8088/cmd?name='+text_nickname+'/sputnik/slotinhand';
  var url = base_url+'/'+slot;
  var code = timer+' await ( await fetch (\'' + url + '\')).text();\n';
  return code;
};

Blockly.JavaScript['minecraft_sputnikBuild'] = function (block) {
  var text_nickname = NickName;
  var dir = block.getFieldValue('dir');
	
  var base_url = 'https://server.x1team.ru:8088/cmd?name='+text_nickname+'/sputnik/build';
  var url = base_url+'/'+dir;
  var code = timer+' await ( await fetch (\'' + url + '\')).text();\n';
  return code;
};

Blockly.JavaScript['minecraft_unSputnik'] = function (block) {
  var text_nickname = NickName;
  var base_url = 'https://server.x1team.ru:8088/cmd?name='+text_nickname+'/sputnik/unsputnik';
  var url = base_url;
  var code = timer+' await ( await fetch (\'' + url + '\')).text();\n';
  return code;
};

Blockly.JavaScript['minecraft_getServer'] = function (block) {
	var text_nickname = NickName;
	var checkbox_bot = block.getFieldValue('bot') === 'TRUE';
	
	if(checkbox_bot==false)
		var url = 'https://server.x1team.ru:8088/poll?name='+text_nickname+'/drone'
	else
		var url = 'https://server.x1team.ru:8088/poll?name='+text_nickname+'/sputnik'
	
	var xmlHttp = "var xmlHttp = new XMLHttpRequest();";
	var xmlopen = "xmlHttp.open( 'GET', \'" + url + "\', false );";
	var xmlhttpHead = "request.getResponseHeader('Content-Type', 'aplication/json', 'charset=utf-8');";
	var xmltry = "xmlHttp.send();" + '\n';
	var response = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('response'), Blockly.VARIABLE_CATEGORY_NAME);
	var code = xmlHttp + '\n' + xmlopen + '\n' + xmltry + ''+response+'=JSON.parse(xmlHttp.responseText);\n';
 
	return code;

};

Blockly.JavaScript['minecraft_sputnikProg'] = function (block) {
	var text_nickname = NickName;
	//var mob_type =  block.getField("mob_type") ? String(Number(block.getFieldValue("mob_type"))) : Blockly.JavaScript.valueToCode(block, "mob_type", Blockly.JavaScript.ORDER_ASSIGNMENT) || "0"   ;
	var mob_type = block.getFieldValue('mob_type');	
	var checkbox_zaxvat = block.getFieldValue('zaxvat') === 'TRUE';
	var otherCode = Blockly.JavaScript.statementToCode(block, 'otherCode');
	var mob_name =  block.getField("mob_name") ? String(Number(block.getFieldValue("mob_name"))) : Blockly.JavaScript.valueToCode(block, "mob_name", Blockly.JavaScript.ORDER_ASSIGNMENT) || "0"   ;
  
  var base_url = 'https://server.x1team.ru:8088/cmd?name='+text_nickname+'/sputnik/create';
	var url = base_url + '/PLAYER/' + mob_name.split("'").join("") + '/false';
	
  var url2 = 'https://server.x1team.ru:8088/cmd?name='+text_nickname+'/sputnik/unsputnik';
  
  var code1 = timer+' await ( await fetch (\'' + url + '\')).text();\n';
	var code2 = timer+' await ( await fetch (\'' + url2 + '\')).text();\n';
	var code = code1+otherCode+'\n'+code2;
  return code;
};

Blockly.JavaScript['minecraft_progSputnikMove'] = function (block) {
    var text_nickname = NickName;
    var checkbox_drone = block.getFieldValue('drone') === 'TRUE';
    var x =  block.getField("x") ? String(Number(block.getFieldValue("x"))) : Blockly.JavaScript.valueToCode(block, "x", Blockly.JavaScript.ORDER_ASSIGNMENT) || "0"   ;
    var y =  block.getField("y") ? String(Number(block.getFieldValue("y"))) : Blockly.JavaScript.valueToCode(block, "y", Blockly.JavaScript.ORDER_ASSIGNMENT) || "0"   ;
    var z =  block.getField("z") ? String(Number(block.getFieldValue("z"))) : Blockly.JavaScript.valueToCode(block, "z", Blockly.JavaScript.ORDER_ASSIGNMENT) || "0"   ;
    
    if(/^(0|-?[1-9]\d{0,5})$/.test(x) == false)
	 x = '\'+'+ x + '+\'';
    if(/^(0|-?[1-9]\d{0,5})$/.test(y) == false)
	 y = '\'+'+ y + '+\'';
    if(/^(0|-?[1-9]\d{0,5})$/.test(z) == false)
	 z = '\'+'+ z + '+\'';
	
    if(checkbox_drone==true) {
	 x=0;
	 y=0;
	 z=0;
    }

    var base_url = 'https://server.x1team.ru:8088/cmd?name='+text_nickname+'/sputnik/movesputnik';
    var url = base_url + '/'+x+'/'+y+'/'+z+'/' + checkbox_drone;
    var code = timer+' await ( await fetch (\'' + url + '\')).text();\n';
    return code;
};

Blockly.JavaScript['minecraft_progSputnikAtack'] = function (block) {
  var text_nickname = NickName;
  var mob_type =  block.getField("mob_type") ? String(Number(block.getFieldValue("mob_type"))) : Blockly.JavaScript.valueToCode(block, "mob_type", Blockly.JavaScript.ORDER_ASSIGNMENT) || "0"   ;
  var radius =  block.getField("radius") ? String(Number(block.getFieldValue("radius"))) : Blockly.JavaScript.valueToCode(block, "radius", Blockly.JavaScript.ORDER_ASSIGNMENT) || "0"   ;
	
  if(/^(0|-?[1-9]\d{0,5})$/.test(radius) == false)
	 radius = '\'+'+ radius + '+\'';
	
  var base_url = 'https://server.x1team.ru:8088/cmd?name='+text_nickname+'/sputnik/sputnikatack';
  var url = base_url + '/' + mob_type.split("'").join("") + '/' + radius;
  var code = timer+' await ( await fetch (\'' + url + '\')).text();\n';
  return code;
};

Blockly.JavaScript['minecraft_tpBot'] = function (block) {
  var text_nickname = NickName;
  var number_x =  block.getField("tpbot_x") ? String(Number(block.getFieldValue("tpdrone_x"))) : Blockly.JavaScript.valueToCode(block, "tpbot_x", Blockly.JavaScript.ORDER_ASSIGNMENT) || "0"   ;
  var number_y =  block.getField("tpbot_y") ? String(Number(block.getFieldValue("tpdrone_y"))) : Blockly.JavaScript.valueToCode(block, "tpbot_y", Blockly.JavaScript.ORDER_ASSIGNMENT) || "0"   ;
  var number_z =  block.getField("tpbot_z") ? String(Number(block.getFieldValue("tpdrone_z"))) : Blockly.JavaScript.valueToCode(block, "tpbot_z", Blockly.JavaScript.ORDER_ASSIGNMENT) || "0"   ;
    
  if(/^(0|-?[1-9]\d{0,5})$/.test(number_x) == false)
	 number_x = '\'+'+ number_x + '+\'';
  if(/^(0|-?[1-9]\d{0,5})$/.test(number_y) == false)
	 number_y = '\'+'+ number_y + '+\'';
  if(/^(0|-?[1-9]\d{0,5})$/.test(number_z) == false)
	 number_z = '\'+'+ number_z + '+\'';
    
  var base_url = 'https://server.x1team.ru:8088/cmd?name='+text_nickname+'/sputnik/tpbot';
  var url = base_url + '/' + number_x + '/' + number_y + '/' + number_z;
  var code = timer+' await ( await fetch (\'' + url + '\')).text();\n';

  return code;
};

Blockly.JavaScript['minecraft_playerToBot'] = function (block) {
  var text_nickname = NickName;
  var base_url = 'https://server.x1team.ru:8088/cmd?name='+text_nickname+'/sputnik/playerToBot';
  var url = base_url;
  var code = timer+' await ( await fetch (\'' + url + '\')).text();\n';
  return code;
};
