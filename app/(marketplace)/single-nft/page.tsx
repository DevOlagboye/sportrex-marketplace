"use client";
import React, { useEffect } from "react";
import ParentLayout from "@/app/layouts/ParentLayout";
import {
  FileInput,
  TextInput,
  TextAreaInput,
  SelectInput,
  ActionBtn,
  Header,
} from "@/app/components";
import { useTranslation } from "react-i18next";
import { useAddress, useContract } from "@thirdweb-dev/react";
import { Formik, ErrorMessage } from "formik";
import * as yup from "yup";
import { CreateSingleNFTProps } from "@/types";
import ContractFactoryAbi from "@/abi/SptContractFactory.json";
const SingleNft = () => {
  const validationSchema = yup.object().shape({
    logo: yup.mixed().required("Required"),
    name: yup.string().required("Required"),
    symbol: yup.string().required("Require"),
    tokenURI: yup.string().required("Require"),
    blockChain: yup.string().required("Require"),
  });

  const { t } = useTranslation("translation");
  const { contract } = useContract(
    process.env.REACT_APP_SPT_MASTER_CONTRACT_FACTORY,
    ContractFactoryAbi
  );
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <ParentLayout>
      <Formik
        initialValues={
          {
            logo: null,
            name: "",
            symbol: "",
            tokenURI: "",
            desc: "",
            blockChain: "",
          } as CreateSingleNFTProps
        }
        onSubmit={async (values, { setSubmitting }) => {
          try {
            setSubmitting(true);
            const data = await contract?.call("create_nft", [
              values.name,
              values.symbol,
              values.tokenURI,
            ]);

            console.log(data);
          } catch (error: any) {
            setSubmitting(false);
            alert(error.message);
          }
        }}
        validationSchema={validationSchema}
      >
        {({
          isSubmitting,
          values,
          handleChange,
          handleSubmit,
          setFieldValue,
        }) => (
          <div className="w-full flex flex-col md:w-10/12 xl:w-6/12 mx-auto mb-32 ">
            <div className="flex flex-col mt-8 xl:mt-20 ">
              <Header>{t("nft_creation")}</Header>
              <p className="text-grey-800  text-sm regular">
                {t("all_fields")}
              </p>
            </div>
            <div className="mt-12">
              <div className="flex-col">
                <h1 className="semibold text-white text-md md:text-xl">
                  {t("upload")} (s)*
                </h1>
                <p className="text-grey-800 text-md">{t("upload_inst")}</p>
              </div>
              <div className="form space-y-8 mt-4">
                <FileInput
                  name="logo"
                  onChange={(e) => {
                    console.log(e.target.files[0]);
                    setFieldValue("logo", e.target.files[0]);
                  }}
                  errMessage={
                    <ErrorMessage
                      className="text-red-500"
                      name="logo"
                      component={"div"}
                    />
                  }
                />
                <TextInput
                  placeholder={t("name_placeholder")}
                  label={t("asset_name")}
                  name="name"
                  value={values.name}
                  setValue={handleChange("name")}
                  errMessage={
                    <ErrorMessage
                      className="text-red-500"
                      name="name"
                      component={"div"}
                    />
                  }
                />
                <TextInput
                  placeholder={"Token Symbol"}
                  label={"Token Symbol"}
                  name="symbol"
                  value={values.symbol}
                  setValue={handleChange("symbol")}
                  errMessage={
                    <ErrorMessage
                      className="text-red-500"
                      name="symbol"
                      component={"div"}
                    />
                  }
                />
                <TextInput
                  placeholder={"Token URI"}
                  label={"Token URI"}
                  name="tokenURI"
                  value={values.tokenURI}
                  setValue={handleChange("tokenURI")}
                  errMessage={
                    <ErrorMessage
                      className="text-red-500"
                      name="symbol"
                      component={"div"}
                    />
                  }
                />
                <TextAreaInput
                  placeholder={t("nft_desc_placeholder")}
                  label={t("desc")}
                  name="desc"
                  value={values.desc}
                  setValue={handleChange("desc")}
                  errMessage={
                    <ErrorMessage
                      className="text-red-500"
                      name="desc"
                      component={"div"}
                    />
                  }
                />
                {/* <SelectInput
              placeholder={t("collections")}
              label={t("collection_label")}
              name="collections"
              options={[
                { value: "collection", label: "Collection" },
                { value: "single", label: "Single" },
                { value: "bundle", label: "Bundle" },
              ]}
            /> */}
                <SelectInput
                  placeholder={t("ethereum")}
                  label={t("blockchain_technology")}
                  name="blockChain"
                  options={[{ value: "bsc-testnet", label: "bsc-testnet" }]}
                  value={values.blockChain}
                  handleChange={handleChange("blockChain")}
                  errMessage={
                    <ErrorMessage
                      className="text-red-500"
                      name="blockChain"
                      component={"div"}
                    />
                  }
                />
              </div>
              <div className="mt-10 flex flex-col  ">
                <div className="mt-20 flex justify-center items-center space-x-8">
                  <div className="w-6/12">
                    <ActionBtn
                      loading={isSubmitting}
                      name={t("create_nft")}
                      action={handleSubmit}
                    />
                  </div>
                  {/* <div className="w-5/12">
                <YellowActionBtn name="Save Changes" />
              </div> */}
                </div>
                <div className="flex justify-center items-center mt-10">
                  <p className="semibold text-grey-800 text-sm text-center md:text-start md:text-base regular ">
                    {t("create_note")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </Formik>
    </ParentLayout>
  );
};

export default SingleNft;
