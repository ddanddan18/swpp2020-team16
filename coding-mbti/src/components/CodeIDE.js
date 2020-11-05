import React, { useEffect, useState } from 'react';
import AceEditor from 'react-ace';
import raw from 'raw.macro';

import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/theme-monokai';

import Box from '@material-ui/core/Box';

function isBrythonScriptLoaded() {
  return !!(document.getElementById('brython_sdk')
    && document.getElementById('brython_stdlib'));
}

function initBrython() {
  return window.brython();
}

function setBrythonEditorInputHandler() {
  // set editor input handler
  const parser = raw('./brython/codeEditorScript.py');
  const script = document.createElement('script');
  script.type = 'text/python3';
  script.text = parser;

  document.body.appendChild(script);
  return () => {
    document.body.removeChild(script);
  };
}

function onLoad(editor) {
  return editor;
}

export default function CodeIDE() {
  const [code, setCode] = useState('#happy coding! fixedFunctionName required.');

  useEffect(() => {
    // after loading necessary brython scripts, inititate brython
    if (isBrythonScriptLoaded()) {
      window.addEventListener('load', initBrython);
    }
    setBrythonEditorInputHandler();
  }, []);

  return (
    <>
      <div style={{ width: '100%' }}>
        <Box component="div" display="inline" p={1} m={1} bgcolor="background.paper">
          <AceEditor
            name="ace-editor"
            mode="python"
            theme="monokai"
            height="500px"
            width="40%"
            onLoad={onLoad}
            onChange={(newCode) => setCode(newCode)}
            fontSize={14}
            showPrintMargin
            showGutter
            highlightActiveLine
            value={code}
            setOptions={{
              enableBasicAutocompletion: false,
              enableLiveAutocompletion: false,
              enableSnippets: false,
              showLineNumbers: true,
              tabSize: 4,
            }}
          />

        </Box>
        <Box component="div" display="inline" p={1} m={1} bgcolor="background.paper">
          <textarea
            id="console"
            style={{
              display: 'inline',
              color: 'red',
              width: `${40}%`,
              height: `${500}px`,
            }}
          />
        </Box>
        <Box component="div" display="inline" p={1} m={1} bgcolor="background.paper">
          <button id="run" type="button">
            RUN
          </button>
        </Box>
        <Box component="div" display="inline" p={1} m={1} bgcolor="background.paper">
          <button id="submit" type="button">
            SUBMIT
          </button>
        </Box>

      </div>
      <textarea hidden id="code-pipe" value={code} />
    </>
  );
}

// import React from 'react';
// import { useEffect } from 'react';

// const loadSDK = function () {
//     const id = "sphere-engine-compilers-jssdk";

//     window.SEC_HTTPS = true;
//     window.SEC_BASE = 'compilers.widgets.sphere-engine.com';
//     window.SEC = window.SEC || (window.SEC = []);

//     const fjs = document.getElementsByTagName("script")[0];

//     if (document.getElementById(id)) return;
//     const script = document.createElement("script");
//     script.id = id;
//     script.src =
//         (window.SEC_HTTPS ? 'https' : 'http') +
//         '://' +
//         window.SEC_BASE +
//         '/static/sdk/sdk.js';
//     script.onload = () => { setEventHandler() };
//     fjs.parentNode.insertBefore(script, fjs);

// }

// const setEventHandler = function () {
//     window.SEC.ready(function () {
//         var beforeSendSubmissionHandler = function (data) {
//             console.log(123, data.submissionSource)
//         };
//         var SECWidget = window.SEC.widget("sec-widget-1");
//         SECWidget.events.subscribe('beforeSendSubmission', beforeSendSubmissionHandler);
//     });
// }

// export default function CodeIDE() {
//     useEffect(() => {
//         loadSDK();
//     }, []);

//     return (
//         <>
//             <div
//                 className="sec-widget"
//                 data-widget="7bc5d5f13cb49e792b6a906844e5e60b"
//                 data-theme="dark"
//             />
//         </>
//     );
// }
