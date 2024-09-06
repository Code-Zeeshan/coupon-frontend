import axios from "@/lib/axios";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import { useState, useEffect } from "react";
import { ImagePicker } from "@/widgets/admin";
import { ADMIN_API } from "@/utils/constants";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
  Input,
  Button,
  Dialog,
  Select,
  Option,
  Typography,
  DialogBody,
  DialogHeader,
  DialogFooter,
} from "@material-tailwind/react";

export function CreateBlogModal({
  title,
  tagId,
  isOpen,
  onClose,
  content,
  setTitle,
  onAction,
  setTagId,
  setContent,
  titleImage,
  setTitleImage,
}) {
  const [blogTags, setBlogTags] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchAllTags();
    }
  }, [isOpen]);

  const fetchAllTags = async () => {
    try {
      const { data } = await axios.get(ADMIN_API.GET_ALL_BLOG_TAGS);
      setBlogTags(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    if (!title || !content) return;

    try {
      setIsSubmitting(true);
      const formData = new FormData();

      formData.append("tag", tagId);
      formData.append("title", title);
      formData.append("content", content);
      formData.append("titleImage", titleImage);

      await axios.post(ADMIN_API.CREATE_BLOGS, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      onAction("create");
    } catch (error) {
      console.error(error);
      setIsSubmitting(false);

      onClose();
    }
  };

  const handleOnSelectTag = (value) => setTagId(tagId === value ? "" : value);

  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setContent(data);
  };

  return (
    <Dialog open={isOpen} handler={onClose} size="lg">
      <DialogHeader>
        <Typography variant="h6" color="gray">
          Create Blog
        </Typography>
      </DialogHeader>

      <DialogBody className="flex flex-col gap-4 max-h-[70vh] overflow-y-auto">
        <Typography color="gray" variant="small" className="font-semibold">
          Title <span style={{ color: "red" }}>*</span>
        </Typography>

        <Input
          size="lg"
          type="text"
          value={title}
          variant="outlined"
          onChange={(e) => setTitle(e.target.value)}
        />

        <Typography color="gray" variant="small" className="font-semibold">
          Blog Tag
        </Typography>

        {blogTags.length > 0 && (
          <Select
            size="lg"
            value={tagId}
            onChange={(e) => handleOnSelectTag(e)}
          >
            {blogTags.map(({ _id, title }, index) => {
              return (
                <Option key={index} value={_id}>
                  <Typography variant="small" color="gray">
                    {title}
                  </Typography>
                </Option>
              );
            })}
          </Select>
        )}

        <Typography color="gray" variant="small" className="font-semibold">
          Content <span style={{ color: "red" }}>*</span>
        </Typography>

        <CKEditor
          data={content}
          editor={ClassicEditor}
          onChange={handleEditorChange}
        />

        <div className="mb-4">
          <Typography
            color="gray"
            variant="small"
            className="mb-2 font-semibold"
          >
            Blog Image <span style={{ color: "red" }}>*</span>
          </Typography>

          <ImagePicker
            file={titleImage}
            setFile={setTitleImage}
            placeHolder={"Upload Blog Image"}
          />
        </div>
      </DialogBody>

      <DialogFooter className="flex justify-end">
        <Button
          color="gray"
          variant="text"
          className="mr-2"
          onClick={onClose}
          disabled={isSubmitting}
        >
          <span>Cancel</span>
        </Button>

        <Button
          color="gray"
          variant="gradient"
          onClick={handleSubmit}
          disabled={!title || !content || !titleImage || isSubmitting}
        >
          <span>Submit</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
