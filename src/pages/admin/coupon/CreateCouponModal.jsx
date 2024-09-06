import axios from "@/lib/axios";

import { useState, useEffect } from "react";
import { ADMIN_API } from "@/utils/constants";
import {
  Input,
  Radio,
  Button,
  Dialog,
  Select,
  Option,
  Textarea,
  Typography,
  DialogBody,
  DialogHeader,
  DialogFooter,
} from "@material-tailwind/react";

export function CreateCouponModal({
  url,
  type,
  title,
  setUrl,
  isOpen,
  setType,
  onClose,
  setTitle,
  discount,
  onAction,
  companyId,
  couponCode,
  description,
  setDiscount,
  couponTagId,
  setCompanyId,
  setCouponCode,
  setDescription,
  setCouponTagId,
}) {
  const [companies, setCompanies] = useState([]);
  const [couponTags, setCouponTags] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchAllTags();
      fetchAllCompanies();
    }

    return () => setIsSubmitting(false);
  }, [isOpen]);

  const fetchAllTags = async () => {
    try {
      const { data } = await axios.get(ADMIN_API.GET_ALL_COUPON_TAGS);
      setCouponTags(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchAllCompanies = async () => {
    try {
      const { data } = await axios.get(ADMIN_API.GET_ALL_COMPANIES);

      setCompanies(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    if (!title || !type || !companyId) return;

    try {
      setIsSubmitting(true);

      await axios.post(ADMIN_API.CREATE_COUPON, {
        url,
        type,
        title,
        discount,
        couponCode,
        description,
        company: companyId,
        couponTag: couponTagId,
      });

      onAction("create");
    } catch (error) {
      console.error(error);
      setIsSubmitting(false);

      onClose();
    }
  };

  const handleOnSelectCompany = (value) =>
    setCompanyId(companyId === value ? "" : value);

  const handleOnSelectCouponTag = (value) =>
    setCouponTagId(couponTagId === value ? "" : value);

  return (
    <Dialog open={isOpen} handler={onClose}>
      <DialogHeader>
        <Typography variant="h6">Create Coupon</Typography>
      </DialogHeader>

      <DialogBody className="flex flex-col gap-4 h-[60vh] overflow-auto">
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
          Discount
        </Typography>

        <Input
          size="lg"
          type="text"
          value={discount}
          variant="outlined"
          onChange={(e) => setDiscount(e.target.value)}
        />

        <Typography color="gray" variant="small" className="font-semibold">
          Type <span style={{ color: "red" }}>*</span>
        </Typography>

        <div className="flex gap-10">
          <Radio
            name="type"
            label="Coupon"
            value="Coupon"
            defaultChecked
            onChange={(e) => setType(e.target.value)}
          />

          <Radio
            name="type"
            label="Deal"
            value="Deal"
            onChange={(e) => setType(e.target.value)}
          />
        </div>

        {type === "Coupon" && (
          <>
            <Typography color="gray" variant="small" className="font-semibold">
              Coupon Code
            </Typography>

            <Input
              size="lg"
              type="text"
              value={couponCode}
              variant="outlined"
              onChange={(e) => setCouponCode(e.target.value)}
            />
          </>
        )}

        <Typography color="gray" variant="small" className="font-semibold">
          Coupon URL
        </Typography>

        <Input
          size="lg"
          type="text"
          value={url}
          variant="outlined"
          onChange={(e) => setUrl(e.target.value)}
        />

        <Typography color="gray" variant="small" className="font-semibold">
          Company <span style={{ color: "red" }}>*</span>
        </Typography>

        {companies.length > 0 && (
          <Select
            size="lg"
            value={companyId}
            onChange={(e) => handleOnSelectCompany(e)}
          >
            {companies.map(({ _id, name }, index) => {
              return (
                <Option key={index} value={_id}>
                  <Typography variant="small" color="gray">
                    {name}
                  </Typography>
                </Option>
              );
            })}
          </Select>
        )}

        <Typography color="gray" variant="small" className="font-semibold">
          Coupon Tag
        </Typography>

        {couponTags.length > 0 && (
          <Select
            size="lg"
            value={couponTagId}
            onChange={(e) => handleOnSelectCouponTag(e)}
          >
            {couponTags.map(({ _id, title }, index) => {
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
          Description
        </Typography>

        <Textarea
          rows={4}
          value={description}
          className="resize-none"
          onChange={(e) => setDescription(e.target.value)}
        />
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
          disabled={!title || !type || !companyId || isSubmitting}
        >
          <span>Submit</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
