import indentImg from "../../assets/images/indent.png";
import quaterImg from "../../assets/images/QuaterDemand.png";
import quaterCompImg from "../../assets/images/compilation.png";
import transferImg from "../../assets/images/transferDemand.png";
import physicaImg from "../../assets/images/physicalstock.png";
import itemIssueImg from "../../assets/images/itemIssue.png";
import issuePatient from "../../assets/images/issuePatient.png";
import issueEmp from "../../../src/assets/images/issueEmployee.png";
import issueSub from "../../../src/assets/images/issueSub.png";
import receipt from "../../../src/assets/images/receipt.png";
import thirdparty from "../../../src/assets/images/thirdparty.png";
import acknowledge from "../../../src/assets/images/acknowledge.png";
import localPur from "../../../src/assets/images/localpurchase.png";
import offlineReturn from "../../../src/assets/images/offlineReturn.png";
import returnEmp from "../../../src/assets/images/returnEmp.png";
import returnPat from "../../../src/assets/images/returnPat.png";
import thirdPartys from "../../../src/assets/images/thirdpartys.png";
import drugmaster from "../../../src/assets/images/drugmaster.png";
import drugMWmaster from "../../../src/assets/images/drugwarehouse.png";
import drugWareHouses from "../../../src/assets/images/DrugWareHousess.png";
import drugAlter from "../../../src/assets/images/drugAlter.png";
import groupMaster from "../../../src/assets/images/groupmaster.png";
import pragrammeMap from "../../../src/assets/images/programmMap.png";
import supplierMast from "../../../src/assets/images/suppliermaster.png";
import approvingAuth from "../../../src/assets/images/approvingAuth.png";
import stockSummary from "../../../src/assets/images/stockSummary.png";
import expiry from "../../../src/assets/images/expiry.png";
import Shortage from "../../../src/assets/images/shortage.png";
import demandNotification from "../../../src/assets/images/Demand_notification.png";
export const menuData = {
  services: [
    {
      title: "Demand",
      children: [
         { title: "Indent Generation", image: indentImg },
        {title:"Quarter Demand", image: quaterImg },
        {title:"Quater Demand Compilation",image:quaterCompImg},
       {title: "Transfer Demand Request",image:transferImg},
        {title:"Physical Stock Verification", image:physicaImg},
         {title:"Demand Notification Detail", image:demandNotification}
      ]
    },
    {
      title: "Issue",
      children: [
       {title: "Issue Desk",image:itemIssueImg},
       {title: "Issue to Patient",image:issuePatient},
       {title: "Issue to Employee",image:issueEmp},
        {title:"Issue to Sub-Store",image:issueSub}
      ]
    },
    {
      title: "Receive",
      children: [
        {title:"Receipt",image:receipt},
        {title:"Receive from third party",image:thirdparty},
        {title:"Acknowledge Desk",image:acknowledge},
        {title:"Local Purchase",image:localPur},
      ]
    },
    {
      title: "Return",
      children: [
       {title: "Offiline return",image:offlineReturn},
       {title: "Return From Employee",image:returnEmp},
       {title:"Return from third party",image:thirdPartys},
         {title:"Return from patient",image:returnPat}
      ]
    }
  ],

  admin: [
    {title:"Drug Master",image:drugmaster},
    {title:"DMW Hierarchy Master",image:drugMWmaster},
    {title:"Drug Warehouse Master",image:drugWareHouses},
   {title: "Group Drug Alteration Master",image:drugAlter},
    {title:"Group Master",image:groupMaster},
   {title: "Programme item mapping master",image:pragrammeMap},
    {title:"Supplier Master",image:supplierMast},
   {title: "Approving Authority Master",image:approvingAuth},
  ],

  reports: [
    {
      title: "Inventory Management",
      children: [
       {title: "Stock Summary",image:stockSummary},
        {title:  "Expiry Report",image:expiry}, 
              {title:     "Shortage Report",image:Shortage}, 

      ]
    }
  ]
};
