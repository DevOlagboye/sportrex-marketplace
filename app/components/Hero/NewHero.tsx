import React,{useState,useEffect} from 'react'
import NormalLayout from '../../layouts/NormalLayout'
import logo from "@/public/assets/sportrex-new-logo.svg"
import { navData } from "../../constants/Navbar";
import { useTranslation } from "react-i18next";

import ActionBtn from '../Button/ActionBtn';
import Language from '../Language/Language';
import Profile from '../Navbar/Profile';
import Resources from '../Navbar/Resources';
import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import { FaUserCircle, FaBell } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "@/app/redux/store";
import { setAddress } from "@/app/redux/features/auth/AuthSlice";
import Notification from "../Navbar/Notification";
import nftA from "@/public/assets/general/nft1.png";
import nftB from "@/public/assets/general/nft2.png";
import nftC from "@/public/assets/general/nft3.png";
import nftD from "@/public/assets/general/nft4.png";
import LinkBtn from '../Button/LinkBtn';
import YellowBtn from '../Button/YellowBtn';
import BlockhainList from './BlockhainList';
import Link from 'next/link';
import Image from 'next/image';
import ConnectModal from '../modals/WalletConnectModal';
const styles = {
  active: "text-white regular light text-[18px] border-b-[1px] border-white",
  inactive: "text-white text-[18px] text-grey-800 regular",
  listItem: "flex items-center justify-center",
  left: "w-full lg:w-6/12 h-full justify-start flex items-center  element-index max-w-[451px]",
  right: "w-full lg:w-6/12  h-full  element-index",
  leftContainer:
    "w-full h-full  element-index flex flex-col lg:mt-[84px] mb-[84px] lg:mb-0 ",
  imgContainer: "w-full sm:w-9/12 lg:w-10/12 mx-auto  element-index",
};
const NewHero = ({ current = 1 }: any) => {
  const { t } = useTranslation(["translation"]);
    const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const [mainAddress, setMainAddress] = useState<any>(auth?.address);


  const handleClose = () => {
    setOpen(false);
  };
  const address = useAddress();
  useEffect(() => {
    setMainAddress(address);
    if (address) setOpen(false);
  }, [address]);

  useEffect(() => {
    if (address) {
      dispatch(setAddress(mainAddress));
    }
  }, [address]);
  return (
    <div className="w-full hidden xl:flex ">
      <ConnectModal open={open} setOpen={handleClose}/>
      <NormalLayout>
        <div className="w-full new-hero-bg flex flex-col ">
          <div className="w-11/12 mx-auto flex flex-col">
            {/* navbar session */}
            <div className="w-full h-[82px] flex items-center bg-white bg-opacity-15 mt-8  rounded-[20px]  ">
              <div className="w-11/12 mx-auto flex items-center justify-between gap-4">
                <span className="w-2/12">
                  <Image
                    src={logo}
                    alt="logo"
                    className="w-full max-w-[150px] h-auto"
                  />
                </span>
                <div className="w-5/12 flex item-center justify-between ">
                  {navData.map((item, index) => {
                    return (
                      <div key={index} className={styles.listItem}>
                        <Link
                          href={item.linkTo}
                          className={
                            current === item.id
                              ? styles.active
                              : styles.inactive
                          }
                        >
                          {t(item.text)}
                        </Link>
                      </div>
                    );
                  })}
                </div>
                <div className="w-5/12 flex items-center gap-3 justify-between">
                  <div className={styles.listItem}>
                    <Resources />
                  </div>
                  <div className={styles.listItem}>
                    <Language />
                  </div>
                  <div className={styles.listItem}>
                    {/* <ActionBtn action={handleOpen} name="Connect Wallet" /> */}
                    <div className="flex items-center ml-4">
                      {address && (
                        <>
                          <Notification />
                          <Profile address={address} />
                        </>
                      )}
                    </div>
                    {!address ? (
                      <ActionBtn
                        name="Connect Wallet"
                        action={() => setOpen((prev) => !prev)}
                      />
                    ) : (
                      <ConnectWallet
                        style={{
                          background: "transparent",
                          border: "0px solid",
                          outline: "none",
                        }}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
            {/* end of navbar */}
            {/* start of content session */}
            <div className="w-full flex flex-col xl:flex-row xl:justify-between xl:gap-8 mt-24  ">
              {/* left pannel  */}
              <div className="w-full xl:w-3/12 flex xl:flex-col">
                <span>
                  <Image src={nftD} alt="nft" className="w-auto h-auto" />
                </span>
                <span className="mt-24 flex justify-end w-full">
                  <Image src={nftB} alt="nft" className="" />
                </span>
              </div>
              {/* end of left panel */}
              {/* CEnter pannel */}
              <div className="w-full xl:w-6/12 xl:min-w-[637px] xl:max-w-[637px] flex flex-col items-center xl:px-4 ">
                <div className=" flex px-4 py-2 items-center space-x-4 border-[#f1f1f1] border-[1px] rounded-[26px] semibold font-semibold semibold w-fit text-[10px] sm:text-base regular lg:text-lg regular ">
                  <div className="no  flex justify-center items-center ">
                    NO 1
                  </div>
                  <div className="text">
                    <p> {t("hero_t")}</p>
                  </div>
                </div>
                <div className=" text-[24px] sm:text-3xl lg:text-[42px]  leading-7 sm:leading-[40px] lg:leading-[51px] bold font-bold bold text-center mt-4">
                  <span className="grad-text mr-2">{t("mint")},</span>
                  <span className="grad-text mr-2">{t("buy")},</span>
                  <span className="text-white mr-2">{t("and")}</span>
                  <span className="grad-text mr-2">{t("stake")}</span>
                  <br />
                  <span className="grad-text mr-2">{t("nft")}</span>
                  <span className="text-white mr-2">{t("with_e")}</span>
                </div>
                <div className="text-white mt-4 ">
                  <p className="text-[16px] sm:text-xl lg:text-2xl leading-[25px] lg:leading-9 regular sm:w-full w-full text-center">
                    {t("hero_header")}
                  </p>
                </div>
                <div className="flex mt-8 space-x-8 items-center">
                  <LinkBtn path="/market" name={t("explore_market")} />
                  <YellowBtn path="/select-nft" name={t("create")} />
                </div>
              </div>
              {/* end of center pannel */}

              {/* right pannel */}
              <div className="w-full  xl:w-3/12 flex flex-row xl:flex-col">
                <span className="flex justify-end">
                  <Image src={nftC} alt="nft" className="w-auto h-auto" />
                </span>
                <span className="mt-24 flex justify-start w-full">
                  <Image src={nftA} alt="nft" className="" />
                </span>
              </div>
              {/* end of right panel */}
            </div>

            {/* ednd of contenet session */}
          </div>
          <div className="w-full xl:mt-24">

          <BlockhainList />
          </div>
        </div>
      </NormalLayout>
    </div>
  );
};

export default NewHero