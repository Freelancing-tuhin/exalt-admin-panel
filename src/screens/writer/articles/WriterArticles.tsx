/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import Navbar from "../../../components/main/navbar/Navbar";
import { Layout } from "../../layout/Layout";

const WriterArticles: React.FC = () => {
  const editorRef = useRef<any>(null);

  const handleSave = () => {
    const content = editorRef.current ? editorRef.current.getContent() : "";
    alert("Article content: " + content);
  };

  return (
    <Layout>
      <Navbar />
      <div style={{ maxWidth: "90%", margin: "0 auto", padding: 24 }}>
        <h2>Write Your Article</h2>
        <div
          style={{
            border: "1px solid #ccc",
            borderRadius: 8,
            marginBottom: 24,
          }}
        >
          <Editor
            apiKey="4kkl05u0f7xhbihpa28fgunyt9rtk94hu2njchi8ptim3wtc"
            onInit={(evt, editor) => (editorRef.current = editor)}
            initialValue=""
            init={{
              height: "80vh",
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
        <button
          onClick={handleSave}
          style={{ padding: "8px 16px", fontSize: 16 }}
        >
          Save Article
        </button>
      </div>
    </Layout>
  );
};

export default WriterArticles;
