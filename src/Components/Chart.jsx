import React, {useState, useEffect} from 'react'
import { View, Dimensions, Text } from 'react-native';
import {LineChart, BarChart } from "react-native-chart-kit";

export const ChartDashboard = ({label, dataChart}) => {
    return (
      <View>
        <LineChart
          data={{
            labels: [label],
            datasets: [
              {
                data: dataChart
              }
            ]
          }}
          width={(Dimensions.get("window").width) - 10} // from react-native
          height={220}
          yAxisLabel="$"
          yAxisSuffix="k"
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: "blue",
            backgroundGradientFrom: "#141E30",
            backgroundGradientTo: "#243B55",
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "green"
            }
          }}
          bezier
          style={{
            marginVertical: 4,
            borderRadius: 5
          }}
        />
      </View>
    )
}

export const BarDashboard = ({graphData}) => {
    const data = {
        labels: ["Assigned", "On-Going", "Delivered", "Cancel"],
        datasets: [
          {
            data: [graphData.received, graphData.ongoing, graphData.delivered, graphData.cancel]
          }
        ]
    };
    return (
      <View>
        <BarChart
            style={{
                marginVertical: 4,
                borderRadius: 5
            }}
            data={data}
            width={(Dimensions.get("window").width) - 10}
            yAxisLabel=""
            height={220}
            chartConfig={{
                backgroundColor: "blue",
                backgroundGradientFrom: "#141E30",
                backgroundGradientTo: "#243B55",
                decimalPlaces: 2, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 16
                },
                propsForDots: {
                  r: "6",
                  strokeWidth: "2",
                  stroke: "#ffa726"
                }
            }}
        />
      </View>
    )
}