import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { database, auth } from "../../../config/config";
import { LinearGradientBackground } from "../../Utils/LinearGradientBackground";
import { Icon } from "react-native-elements";
import DisplayRecords from "../../Utils/DisplayRecord";
import { RoundButton } from "../../../../Utils/RoundButton";
import { ScreenHeight, ScreenWidth } from "../../../../constant/Constant";
import { PatientProfile } from "./PatientProfile";
import { connect } from "react-redux";
import { getRecordsUpdate, records } from "../../../reducers/records";

class ProfPatientRecordView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info: null,
      selectedIndex: -1,
      recordsLen: -1,
      currentRecords: null,
      isAdj: true,
    };
  }

  componentDidMount() {
    const { key } = this.props.route.params;
    const { getRecordsUpdateHandler } = this.props;

    let userInfo = database.ref("users/" + key);

    userInfo.once("value").then((snapshot) => {
      this.setState({
        info: snapshot.val(),
      });
    });

    if (key) {
      getRecordsUpdateHandler(key);
    }
  }

  componentDidUpdate(prevProps) {
    const { currentRecords } = this.state;
    if (currentRecords == null) {
      const { records, dateList } = this.props.recordStore;
      if (records && dateList) {
        this.setState({
          recordsLen: dateList.length,
          selectedIndex: dateList.length - 1,
          currentRecords: records[dateList[dateList.length - 1]],
        });
      }
    }
    if (Object.keys(prevProps.recordStore).length == 0) {
      const { records, dateList } = this.props.recordStore;
      if (records && dateList) {
        this.setState({
          recordsLen: dateList.length,
          selectedIndex: dateList.length - 1,
          currentRecords: records[dateList[dateList.length - 1]],
        });
      }
    } else {
      if (
        prevProps.recordStore.dateList.length !==
        this.props.recordStore.dateList.length
      ) {
        this.setState({
          recordsLen: dateList.length,
          selectedIndex: dateList.length - 1,
          currentRecords: records[dateList[dateList.length - 1]],
        });
      }
    }
  }

  render() {
    const { selectedIndex, recordsLen, currentRecords, info } = this.state;
    const { records, dateList } = this.props.recordStore;
    const { key, inactive } = this.props.route.params;

    return (
      <LinearGradientBackground
        colors={["#1872a7", "#5a74d1", "#a676ff"]}
        start={[0, 0.9]}
        end={[1, 0.1]}
        locations={[0, 0.5, 1]}
        style={{
          height: "100%",
          paddingTop: ScreenHeight * 0.045,
          paddingHorizontal: ScreenWidth * 0.1,
        }}
      >
        <View style={styles.patientInfo}>
          {info && <PatientProfile info={info} />}
        </View>
        <View
          style={{
            flex: 3,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View style={styles.boxes}>
            {!(records && dateList && currentRecords) ? (
              <Text style={styles.noDataText}>
                {"暫無數據\n請按 + 輸入資料"}
              </Text>
            ) : (
              <View style={{ height: "100%" }}>
                <RoundButton
                  buttonStyle={{ backgroundColor: "#2D9CDB" }}
                  textStyle={{ color: "white" }}
                  title={this.state.isAdj ? "查看真實度數" : "查看調整度數"}
                  onPress={() => this.setState({ isAdj: !this.state.isAdj })}
                />
                <View style={styles.datePickerContainer}>
                  {dateList.length < 2 ? null : (
                    <TouchableOpacity
                      onPress={() =>
                        this.setState({
                          selectedIndex:
                            (selectedIndex + recordsLen - 1) % recordsLen,
                        })
                      }
                    >
                      <Icon
                        name="swapleft"
                        type="antdesign"
                        size={ScreenWidth * 0.1}
                        color="#2D9CDB"
                      />
                    </TouchableOpacity>
                  )}
                  <Text style={styles.dateText}>{dateList[selectedIndex]}</Text>
                  {dateList.length < 2 ? null : (
                    <TouchableOpacity
                      onPress={() =>
                        this.setState({
                          selectedIndex: (selectedIndex + 1) % recordsLen,
                        })
                      }
                    >
                      <Icon
                        name="swapright"
                        type="antdesign"
                        size={ScreenWidth * 0.1}
                        color="#2D9CDB"
                      />
                    </TouchableOpacity>
                  )}
                </View>
                <DisplayRecords
                  curRecord={currentRecords}
                  isAdj={this.state.isAdj}
                />
                <View style={{ height: 20 }} />
              </View>
            )}
          </View>
          <View
            style={{
              flex: 0.2,
              alignContent: "center",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("AddRecordScreen", {
                  isProfessional: true,
                  professional_id: auth.currentUser.uid,
                  patient_id: key,
                  inactive: inactive,
                });
              }}
              style={{
                backgroundColor: "white",
                width: 48,
                height: 48,
                borderRadius: 24,
                justifyContent: "center",
              }}
            >
              <Icon name="add" size={25} color="#2D9CDB" />
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradientBackground>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    recordStore: state.records,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getRecordsUpdateHandler: (uid) => dispatch(getRecordsUpdate(uid)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfPatientRecordView);

const styles = StyleSheet.create({
  patientInfo: {
    flex: 1.3,
    paddingLeft: ScreenWidth * 0.035,
  },
  centreText: {
    textAlign: "center",
  },
  boxes: {
    backgroundColor: "white",
    flex: 1,
    borderRadius: 20,
    justifyContent: "center",
    padding: 10,
    paddingBottom: 20,
    width: "100%",
  },
  buttonText: {
    color: "black",
    textAlign: "center",
    fontSize: 20,
  },
  gridText: {
    color: "#2D9CDB",
    textAlign: "center",
    fontSize: 20,
  },
  gridHeader: {
    color: "#2D9CDB",
    textAlign: "left",
    fontSize: 20,
    paddingLeft: 30,
    fontWeight: "bold",
  },
  datePickerContainer: {
    flex: 0.25,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  dateText: {
    color: "#2D9CDB",
    fontSize: ScreenWidth * 0.056,
    paddingHorizontal: 10,
    fontWeight: "bold",
    textAlign: "center",
  },
  noDataText: {
    fontSize: 25,
    textAlign: "center",
    color: "#2D9CDB",
  },
});
