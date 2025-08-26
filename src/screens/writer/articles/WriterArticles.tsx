/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import Navbar from "../../../components/main/navbar/Navbar";
import { Layout } from "../../layout/Layout";
import { Pencil } from "lucide-react";
import BannerUploadPage from "../../../components/shared/bannerUpload/BannerUpload";

const WriterArticles: React.FC = () => {
  const editorRef = useRef<any>(null);

  const handleSave = () => {
    const content = editorRef.current ? editorRef.current.getContent() : "";
    // alert("Article content: " + content);
    console.log("======>content", content);
  };
  const [title, setTitle] = React.useState("");

  return (
    <Layout>
      <Navbar />
      <div
        style={{
          maxWidth: "100%",
          margin: "0 auto",
          padding: 24,
          display: "flex",
          gap: 32,
        }}
      >
        <div style={{ flex: 2 }}>
          <div className="w-full mb-4">
            <div className="flex items-center gap-2 rounded-2xl border border-gray-300 bg-white shadow-sm px-4 py-3 focus-within:ring-2 focus-within:ring-blue-400">
              <Pencil className="w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder="Article Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-transparent text-xl outline-none placeholder-gray-400"
              />
            </div>
          </div>

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
          <button
            onClick={handleSave}
            style={{ padding: "8px 16px", fontSize: 16 }}
          >
            Save Article
          </button>
        </div>
        {/* IMAGE BANNER */}
        <BannerUploadPage />
      </div>
    </Layout>
  );
};

export default WriterArticles;
