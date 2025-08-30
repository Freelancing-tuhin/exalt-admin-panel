/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Editor } from "@tinymce/tinymce-react";

type Props = {
  editorRef: React.MutableRefObject<any>;
  content: string;
  setContent: (s: string) => void;
};

const WritingTab: React.FC<Props> = ({ editorRef, content, setContent }) => {
  return (
    <>
      <div
        style={{
          border: "1px solid #ccc",
          borderRadius: 8,
          marginBottom: 24,
        }}
      >
        <Editor
          apiKey="4kkl05u0f7xhbihpa28fgunyt9rtk94hu2njchi8ptim3wtc"
          onInit={(_evt, editor) => (editorRef.current = editor)}
          value={content}
          onEditorChange={(newValue: string) => setContent(newValue)}
          init={{
            height: 600,
            menubar: false,
            plugins: [
              "advlist autolink lists link image charmap print preview anchor",
              "searchreplace visualblocks code fullscreen",
              "insertdatetime media table paste code help wordcount",
            ],
            toolbar: [
              "undo redo | formatselect | fontselect | fontsizeselect",
              "bold italic underline strikethrough | forecolor backcolor | link image media | blockquote code | customimage",
              "alignleft aligncenter alignright alignjustify | outdent indent",
              "bullist numlist | table | hr | subscript superscript | charmap emoticons",
              "removeformat | preview fullscreen",
            ].join(" | "),
            setup: function (editor: any) {
              editor.ui.registry.addButton("customimage", {
                text: "Insert Image",
                icon: "image",
                onAction: function () {
                  editor.windowManager.open({
                    title: "Insert Image",
                    body: {
                      type: "panel",
                      items: [
                        {
                          type: "input",
                          name: "imageUrl",
                          label: "Image URL",
                        },
                      ],
                    },
                    buttons: [
                      {
                        type: "cancel",
                        text: "Cancel",
                      },
                      {
                        type: "submit",
                        text: "Insert",
                        primary: true,
                      },
                    ],
                    onSubmit: function (api: any) {
                      const data = api.getData();
                      if (data.imageUrl) {
                        editor.insertContent(
                          `<img src="${data.imageUrl}" alt="Image" />`
                        );
                      }
                      api.close();
                    },
                  });
                },
              });
            },
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:16px }",
          }}
        />
      </div>
      {/* Save button moved to parent component */}
    </>
  );
};

export default WritingTab;
