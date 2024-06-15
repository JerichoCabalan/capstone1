// import React, { useCallback, useEffect, useState } from "react";
// import FloatInput from "../../../providers/FloatInput";
// import { Button, Card, Col, Form, Row, notification } from "antd";
// import FloatSelect from "../../../providers/FloatSelect";
// import TextArea from "antd/es/input/TextArea";
// import FloatDatePicker from "../../../providers/FloatDatePicker";
// import dayjs from "dayjs";
// import { debounce } from "lodash";
// import { GET, POST } from "../../../providers/useAxiosQuery";
// import notificationErrors from "../../../providers/notificationErrors";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//     faBusinessTime,
//     faComputer,
//     faKeyboard,
//     faToolbox,
//     faUsers,
// } from "@fortawesome/pro-regular-svg-icons";

// export default function PageInventoryAdminForm() {
//     return (
//         <Row gutter={[12, 12]}>
//             <Col xs={24} sm={24} md={24} lg={24} xl={16} xxl={16}>
//                 <h1>Dashboard</h1>
//                 <div
//                     style={{
//                         marginLeft: "20px",
//                         marginTop: "50px",
//                     }}
//                 >
//                     <Row gutter={[12, 12]}>
//                         <Col
//                             xs={24}
//                             sm={12}
//                             md={8}
//                             lg={8}
//                             xl={8}
//                             xxl={8}
//                             style={{
//                                 marginTop: "15px",
//                             }}
//                         >
//                             <Card
//                                 style={{
//                                     width: 300,
//                                     backgroundColor: "#a5aeff",
//                                     borderRadius: "60px",
//                                     boxShadow:
//                                         "rgb(165, 174, 255) 0px 25px 20px -20px",
//                                 }}
//                             >
//                                 <Row>
//                                     <div
//                                         style={{
//                                             fontSize: "50px",
//                                             color: "blue",
//                                             marginLeft: "80px",
//                                             marginTop: "-65px",
//                                             border: "1px solid #a5aeff",
//                                             borderRadius: "50%",
//                                             backgroundColor: "#a5aeff",
//                                             width: "70px",
//                                             height: "70px",
//                                             display: "flex",
//                                             alignItems: "center",
//                                             justifyContent: "center",
//                                         }}
//                                     >
//                                         <FontAwesomeIcon
//                                             style={{
//                                                 fontSize: "35px",
//                                             }}
//                                             icon={faKeyboard}
//                                         />
//                                     </div>
//                                     <Col span={11}>
//                                         <p
//                                             style={{
//                                                 fontSize: "50px",
//                                                 color: "green",
//                                                 marginLeft: "-2px",
//                                             }}
//                                         >
//                                             12
//                                         </p>
//                                         <p
//                                             style={{
//                                                 color: "green",
//                                                 marginLeft: "12px",
//                                             }}
//                                         >
//                                             Active
//                                         </p>
//                                     </Col>
//                                     <Col span={2}>
//                                         <div
//                                             style={{
//                                                 borderLeft: "1px solid black",
//                                                 height: "100%",
//                                             }}
//                                         />

//                                         <p
//                                             style={{
//                                                 marginLeft: "-22px",
//                                                 marginTop: "-75px",
//                                                 fontSize: "17px",
//                                                 backgroundColor: "#a5aeff",
//                                                 color: "blue",
//                                             }}
//                                         >
//                                             Status
//                                         </p>
//                                     </Col>

//                                     <Col span={11}>
//                                         <p
//                                             style={{
//                                                 fontSize: "50px",
//                                                 color: "red",
//                                                 marginLeft: "37px",
//                                             }}
//                                         >
//                                             5
//                                         </p>
//                                         <p
//                                             style={{
//                                                 color: "red",
//                                                 marginLeft: "37px",
//                                             }}
//                                         >
//                                             Inactive
//                                         </p>
//                                     </Col>
//                                 </Row>
//                                 <div
//                                     style={{
//                                         display: "flex",
//                                         justifyContent: "center",
//                                         marginTop: "20px",
//                                         marginLeft: "-25px",
//                                     }}
//                                 >
//                                     <Button
//                                         style={{
//                                             backgroundColor: "orange",
//                                             borderRadius: 20,
//                                         }}
//                                         type="primary"
//                                     >
//                                         View Details
//                                     </Button>
//                                 </div>
//                             </Card>
//                         </Col>

//                         <Col
//                             xs={24}
//                             sm={12}
//                             md={8}
//                             lg={8}
//                             xl={8}
//                             xxl={8}
//                             style={{
//                                 marginTop: "15px",
//                             }}
//                         >
//                             <Card
//                                 style={{
//                                     width: 300,
//                                     backgroundColor: "#DAF7A6",
//                                     borderRadius: "60px",
//                                     boxShadow:
//                                         "rgb(218, 247, 166) 0px 25px 20px -20px",
//                                 }}
//                             >
//                                 <Row>
//                                     <div
//                                         style={{
//                                             fontSize: "50px",
//                                             color: "blue",
//                                             marginLeft: "80px",
//                                             marginTop: "-65px",
//                                             border: "1px solid #DAF7A6",
//                                             borderRadius: "50%",
//                                             backgroundColor: "#DAF7A6",
//                                             width: "70px",
//                                             height: "70px",
//                                             display: "flex",
//                                             alignItems: "center",
//                                             justifyContent: "center",
//                                         }}
//                                     >
//                                         <FontAwesomeIcon
//                                             style={{
//                                                 fontSize: "35px",
//                                             }}
//                                             icon={faComputer}
//                                         />
//                                     </div>

//                                     <Col span={11}>
//                                         <p
//                                             style={{
//                                                 fontSize: "50px",
//                                                 color: "green",
//                                                 marginLeft: "-8px",
//                                             }}
//                                         >
//                                             12
//                                         </p>{" "}
//                                         <p style={{ color: "green" }}>Accept</p>
//                                     </Col>
//                                     <Col span={2}>
//                                         <div
//                                             style={{
//                                                 borderLeft: "1px solid black",
//                                                 height: "100%",
//                                             }}
//                                         />
//                                         <p
//                                             style={{
//                                                 marginLeft: "-43px",
//                                                 marginTop: "-75px",
//                                                 fontSize: "17px",
//                                                 backgroundColor: "#DAF7A6",
//                                                 color: "blue",
//                                                 width: "100px",
//                                             }}
//                                         >
//                                             Equipement
//                                         </p>
//                                     </Col>

//                                     <Col span={11}>
//                                         <p
//                                             style={{
//                                                 fontSize: "50px",
//                                                 color: "#ff3b00 ",
//                                                 marginLeft: "49px",
//                                             }}
//                                         >
//                                             5
//                                         </p>{" "}
//                                         <p
//                                             style={{
//                                                 color: "red",
//                                                 marginLeft: "40px",
//                                             }}
//                                         >
//                                             Pending
//                                         </p>
//                                     </Col>
//                                 </Row>
//                                 <div
//                                     style={{
//                                         display: "flex",
//                                         justifyContent: "center",
//                                         marginTop: "20px",
//                                         marginLeft: "-25px",
//                                     }}
//                                 >
//                                     <Button
//                                         style={{
//                                             backgroundColor: "orange",
//                                             borderRadius: "100px",
//                                         }}
//                                         type="primary"
//                                     >
//                                         View Equipment
//                                     </Button>
//                                 </div>
//                             </Card>
//                         </Col>

//                         <Col
//                             xs={24}
//                             sm={12}
//                             md={8}
//                             lg={8}
//                             xl={8}
//                             xxl={8}
//                             style={{
//                                 marginTop: "15px",
//                             }}
//                         >
//                             <Card
//                                 style={{
//                                     width: 300,
//                                     backgroundColor: "#ffcece",
//                                     borderRadius: "60px",
//                                     boxShadow:
//                                         "rgb(255, 206, 206) 0px 25px 20px -20px",
//                                 }}
//                             >
//                                 <Row>
//                                     <div
//                                         style={{
//                                             fontSize: "50px",
//                                             color: "blue",
//                                             marginLeft: "80px",
//                                             marginTop: "-65px",
//                                             border: "1px solid #ffcece",
//                                             borderRadius: "50%",
//                                             backgroundColor: "#ffcece",
//                                             width: "70px",
//                                             height: "70px",
//                                             display: "flex",
//                                             alignItems: "center",
//                                             justifyContent: "center",
//                                         }}
//                                     >
//                                         <FontAwesomeIcon
//                                             style={{
//                                                 fontSize: "35px",
//                                             }}
//                                             icon={faBusinessTime}
//                                         />
//                                     </div>
//                                     <Col span={11}>
//                                         <p
//                                             style={{
//                                                 fontSize: "50px",
//                                                 color: "green",
//                                             }}
//                                         >
//                                             120
//                                         </p>{" "}
//                                         <p style={{ color: "green" }}>
//                                             Available Stock
//                                         </p>
//                                     </Col>

//                                     <Col span={2}>
//                                         <div
//                                             style={{
//                                                 borderLeft: "1px solid black",
//                                                 height: "100%",
//                                             }}
//                                         />

//                                         <p
//                                             style={{
//                                                 marginLeft: "-21px",
//                                                 marginTop: "-75px",
//                                                 fontSize: "17px",
//                                                 backgroundColor: "#ffcece",
//                                                 color: "blue",
//                                                 width: "47px",
//                                             }}
//                                         >
//                                             Stock
//                                         </p>
//                                     </Col>
//                                     <Col span={11}>
//                                         <p
//                                             style={{
//                                                 fontSize: "50px",
//                                                 color: "#ff3b00 ",
//                                                 marginLeft: "50px",
//                                             }}
//                                         >
//                                             5
//                                         </p>{" "}
//                                         <p
//                                             style={{
//                                                 color: "#ff3b00",
//                                                 marginLeft: "31px",
//                                                 width: "100px",
//                                             }}
//                                         >
//                                             Out Of Stock
//                                         </p>
//                                     </Col>
//                                 </Row>
//                                 <div
//                                     style={{
//                                         display: "flex",
//                                         justifyContent: "center",
//                                         marginTop: "20px",
//                                         marginLeft: "-25px",
//                                         borderRadius: "100px",
//                                     }}
//                                 >
//                                     <Button
//                                         style={{
//                                             backgroundColor: "orange",
//                                         }}
//                                         type="primary"
//                                         onClick={() =>
//                                             navigate("/inventory/equipment")
//                                         }
//                                     >
//                                         View Stock
//                                     </Button>
//                                 </div>
//                             </Card>
//                         </Col>
//                     </Row>
//                 </div>
//             </Col>
//         </Row>
//     );
// }
