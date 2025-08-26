/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import BannerUploadPage from "../../../components/shared/bannerUpload/BannerUpload";

const EventEditor: React.FC = () => {
  const editorRef = useRef<any>(null);
  const [title, setTitle] = useState("");
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);

  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setBannerPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    const content = editorRef.current ? editorRef.current.getContent() : "";
    console.log("=== save", { title, bannerPreview, content });
  };

  return (
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
                        { type: "cancel", text: "Cancel" },
                        { type: "submit", text: "Insert", primary: true },
                      ],
                      onSubmit: function (api: any) {
                        const data = api.getData();
                        if (data.imageUrl)
                          editor.insertContent(
                            `<img src="${data.imageUrl}" alt="Image" />`
                          );
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
          Save Event
        </button>
      </div>

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
        }}
      >
        {bannerPreview ? (
          <img
            src={bannerPreview}
            alt="Banner Preview"
            style={{
              maxWidth: "100%",
              maxHeight: 200,
              borderRadius: 8,
              border: "1px solid #ccc",
            }}
          />
        ) : (
          <BannerUploadPage />
        )}
      </div>
    </div>
  );
};

export default EventEditor;
