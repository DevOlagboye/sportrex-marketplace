import React, { useEffect, useState } from "react";

import heart from "@/public/assets/heart.svg";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MediaRenderer, useContract, useNFT } from "@thirdweb-dev/react";
import NftLoading from "../../Loader/NftLoading";
import axios from "axios";
import { NftResult } from "@/types";
import { useRouter } from "next/navigation";
const OwnedCard = ({ isTrending, item  }: {
  isTrending: boolean,
  item: NftResult
}) => {
  const [liked, setLiked] = useState(false);
  const [openOptions, setOpenOptions] = useState(false);
  const [loading, setLoading] = useState(false);
  const [retrievedNft, setRetrievedNft] = useState<any>(({
    image: heart,
    name: "NFT not found"
  }));
  const navigate = useRouter();
  const { contract } = useContract(item.token_address)
  const { data: nft , isLoading, error } = useNFT(contract, item.token_id)
  const getNftData = async (uri: string) => {
      await axios.get(uri)
      .then(res => {
        setRetrievedNft(res.data)
      })
  }
  
  useEffect(() => {
     setLoading(isLoading)
    if(nft?.metadata.error) {
      const uri = nft.metadata.uri.replace('ipfs://', 'https://nftstorage.link/ipfs/').replace('{id}', nft.metadata.id);
      getNftData(uri)
    }
  } , [isLoading])

if(loading) return <NftLoading />

  
  // const handleMint = () => {
  //   navigate("/mint-nft");
  // };
  // const handleEdit = () => {
  //   navigate("/edit-nft");
  // };
  return (
    // <div className="w-full box-border  lg:min-w-[300px] md:h-[350px] sm:w-[280px] lg:w-[304px] h-full bg-no-repeat bg-cover bg-blue-header rounded-[10px] md:rounded-[20px] p-3 flex flex-col items-start space-y-[12px] justify-between relative">
    <div className="w-full overflow-hidden box-border md:h-[350px] h-full bg-blue-header rounded-[10px] p-1 md:rounded-[20px] flex flex-col  relative">
      <div className="absolute left-2 top-2">
        {/* <BsThreeDotsVertical
          className="text-white text-2xl self-end"
          onClick={() => setOpenOptions(!openOptions)}
        /> */}
       { Number(item.amount) > 1 && <span className="bg-black text-[14px] rounded-full p-1"> {`x${item.amount}`} </span>}
        {/* {openOptions && (
          <div className="mt-2 w-40 bg-blue-body rounded-[15px] flex flex-col space-y-1 p-4">
            <p
              className="w-full hover:bg-blue-btn text-white text-lg regular regular cursor-pointer"
              onClick={handleEdit}
            >
              Edit
            </p>
            <p
              className="w-full text-lg regular  hover:bg-blue-btn text-white regular cursor-pointer"
              onClick={handleMint}
            >
              mint
            </p>
          </div>
        )} */}

      </div>
    <MediaRenderer 
    className="w-full flex-[3]  rounded-[20px] object-cover "
    src={nft?.metadata.image || retrievedNft.image}
    />
      <div className="flex flex-1 overflow-hidden justify-between items-center w-full mb-2 px-2">
      <div >
      <p className="text-[16px] semibold">{nft?.metadata.name || retrievedNft.name}</p>
        <div className="text-[#FAC744]  text-[14px] semibold leading-[22px]">
          0.3 SPT
        </div>
      </div>
        <div />
        <div className="flex gap-x-2 items-center">
          {liked ? (
            <AiFillHeart
              className="text-[24px] text-yellow"
              onClick={() => setLiked(false)}
            />
          ) : (
            <AiOutlineHeart
              className="text-[24px] text-grey-800"
              onClick={() => setLiked(true)}
            />
          )}
          <span className="regular text-[#ABABAB]">0</span>
        </div>
      </div>
    </div>
  );
};

export default OwnedCard;