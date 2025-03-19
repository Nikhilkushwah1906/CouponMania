import { Button, Grid2 } from "@mui/material";
import { useState, useEffect } from "react";
import { postData, serverURL } from "../../../services/FetchNodeServices";
import TopStoreShowAllComponent from "../topstore/TopStoreShowAllComponent";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function CashBackLoadPageHeading({ cashbackid }) {
  const [cashBackOfferList, setCashBackOfferList] = useState([]);
  const [cashBackDetails, setCashBackDetails] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));

  const fetchAllCashBackOffer = async () => {
    var response = await postData("coupon/fetch_cashbackoffer", { cashbackid });
    setCashBackOfferList(response.data);
  };

  const fetchAllCashBackDetails = async () => {
    var response = await postData("coupon/fetch_cashbackdetails", { cashbackid });
    console.log(JSON.stringify(response.data[0]));
    setCashBackDetails(response.data[0]);
  };

  const showCashBackOffer = () => {
    return cashBackOfferList.map((item) => {
      return (
        <div>
          <TopStoreShowAllComponent item={item} topstoreDetails={cashBackDetails} />
        </div>
      );
    });
  };

  useEffect(() => {
    fetchAllCashBackOffer();
    fetchAllCashBackDetails();
  }, []);

  return (
  <Grid2 style={{ display: "flex",Object:'fit' }} container>
      <Grid2
        style={{
          background: "#272e3a",
          height: 380,
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent:matches?'end': "center",
          flexDirection:matches?'column':'row',
        }}
        size={12}
      >
        <img
          src={`${serverURL}/images/${
            cashBackDetails?.companyicon || "Loading..."
          }`}
          style={{ width: 150, height: 80, marginRight: 40, borderRadius: 10 ,marginTop:matches?110:''}}
          alt="logo"
        />
        <div
          style={{
            height: "60%",
            width:matches?'90%': "55%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            marginBottom:10
          }}
        >
          <div style={{ fontSize: 25, fontWeight: 500, color: "#fff" }}>
            {cashBackDetails?.companyname || "Loading..."} Offers & Coupons
          </div>
          <div
            style={{
              fontSize: 14,
              color: "#fff",
              marginTop: 6,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            {showAll
              ? cashBackDetails?.companydescription || "Loading..."
              : (cashBackDetails?.companydescription?.slice(0, 100) ||
                  "Loading...") +
                (cashBackDetails?.companydescription?.length > 100
                  ? "..."
                  : "")}

            {cashBackDetails?.companydescription?.length > 100 && (
              <Button
                variant="text"
                onClick={() => setShowAll(!showAll)}
                style={{ color: "white", marginLeft: 5 }}
              >
                {showAll ? "View Less" : "View More"}
              </Button>
            )}
          </div>
        </div>
      </Grid2>
      <Grid2
        style={{
          height: "auto",
          background: "#f5f5f5",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Grid2
          style={{
            width:matches?"90%": "47%",
            display: "flex",
            flexDirection: "column",
            margin: "30px 0px 30px 0px",
          }}
          container
          spacing={4}
        >
          {showCashBackOffer()}
        </Grid2>
      </Grid2>
    </Grid2>
  );
}
