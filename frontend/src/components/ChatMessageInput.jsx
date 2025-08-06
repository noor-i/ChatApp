import React, { useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { Image, Send } from "lucide-react";
import toast from "react-hot-toast";

const ChatMessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const { sendMessage } = useChatStore();

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    // Check if the selected file is an image
    if (!file.type.startsWith("image/")) {
      toast.error("Please select file type: image");
      return;
    }

    // Create a new FileReader to read the file's data
    const reader = new FileReader();

    // When the file has finished reading (success or fail), this function runs
    reader.onloadend = () => {
      // Set the image preview state to the file's data URL (so we can show a preview)
      setImagePreview(reader.result);
    };
    // Start reading the file as a base64 string (this triggers onloadend when done)
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    // fileInputRef.current is the DOM node for the file input, or null if not rendered.
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e) => {
    // Prevent page from refreshing after sending message
    e.preventDefault();
  };

  return (
    <div className="p-4 w-full">
      <div>
        {imagePreview && (
          <div className="mb-3 flex items-center gap-2">
            <div className="relative">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
              />
              <button
                onClick={removeImage}
                className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300
              flex items-center justify-center"
                type="button"
              >
                <X className="size-3" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/*
        1. User clicks the image button.
        2. fileInputRef.current?.click() opens the hidden file input's file picker.
        3. User selects a file; this triggers the input's onChange event.
        4. handleImageChange runs, where you can read the selected file and update state (e.g., show a preview).
        */}

      <form onSubmit={handleSendMessage} className="flex items-center gap-3">
        <div className="flex flex-1 gap-2">
          {/* Controlled input: value is managed by React state (text), 
            onChange updates the text state as the user types. */}
          <input
            type="text"
            placeholder="Type a message..."
            className="w-full input input-bordered rounded-lg input-sm sm:input-md"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />
          <button
            type="button"
            className={`hidden sm:flex btn btn-circle ${
              imagePreview ? "text-emerald-500" : "text-zinc-400"
            }`}
            onClick={() => {
              fileInputRef.current?.click();
            }}
          >
            <Image size={20} />
          </button>
        </div>
        {/* Send button: disable if after trimming text, text input is empty AND if no image selected */}
        <button
          type="submit"
          className="btn btn-sm btn-circle sm:btn-md"
          disabled={!text.trim() && !imagePreview}
        >
          <Send size={21} />
        </button>
      </form>
    </div>
  );
};

export default ChatMessageInput;
