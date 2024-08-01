/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
(function () {
  let currentButton;


  //aqui carrega o conteudo do workspace, para associar edit com play.

  function handlePlay(event) {
    // Add code for playing sound.
    loadWorkspace(event.target);
    let code = javascript.javascriptGenerator.workspaceToCode(Blockly.getMainWorkspace());
    code += 'MusicMaker.play()';
    try{
      eval(code);
       }catch(error){
        console.log(error);
       }

  }
/* essa função é para salvar as edições feitas para adicionar sons em cada botao*/

  function save(button) {
    // Add code for saving the behavior of a button.
    button.blocklySave = Blockly.serialization.workspaces.save(
      Blockly.getMainWorkspace());
  }

  // aqui carrega as edições feitas
  function loadWorkspace(button){
    const workspace = Blockly.getMainWorkspace();
    if(button.blocklySave){
      Blockly.serialization.workspaces.load(button.blocklySave, workspace);
    }else{
      workspace.clear();}
  }

  function handleSave() {
    document.body.setAttribute('mode', 'edit');
    save(currentButton);
  }

  function enableEditMode() {
    document.body.setAttribute('mode', 'edit');
    document.querySelectorAll('.button').forEach((btn) => {
      btn.removeEventListener('click', handlePlay);
      btn.addEventListener('click', enableBlocklyMode);
    });
  }

  function enableMakerMode() {
    document.body.setAttribute('mode', 'maker');
    document.querySelectorAll('.button').forEach((btn) => {
      btn.addEventListener('click', handlePlay);
      btn.removeEventListener('click', enableBlocklyMode);
    });
  }

  function enableBlocklyMode(e) {
    document.body.setAttribute('mode', 'blockly');
    currentButton = e.target;
    loadWorkspace(currentButton);
  }

  document.querySelector('#edit').addEventListener('click', enableEditMode);
  document.querySelector('#done').addEventListener('click', enableMakerMode);
  document.querySelector('#save').addEventListener('click', handleSave);

  enableMakerMode();
/* aqui é caixa de ferramentas para o usuario selecionar, a repetição
 e qual som irá tocar */
      const toolbox ={
        kind:'flyoutToolbox',
        contents:[
          {
            kind:'block',
            type:'controls_repeat_ext',
            inputs:{
              TIMES:{
                shadow:{
                  type:'math_number',
                  fields:{
                    NUM:5
                  }
                }
              }
            }
          },
          {
            kind:'block',
            type:'play_sound'
          }
        ]
      };
// para adicionar no espaço de trabalho
    Blockly.inject('blocklyDiv',{
      toolbox:toolbox,
      scrollbars:false,
      horizontalLayout:true,
      toolboxPosition:"end"
    });



})();
