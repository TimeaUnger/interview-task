import { useMemo } from "react";
import { Bar } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Comment } from "@/types/Comment";

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface WordCountChartProps {
  comments: Comment[];
}

const WordCountChart = ({ comments }: WordCountChartProps) => {
  const commentWordCounts = useMemo(
    () =>
      comments.slice(0, 5).map((comment) => ({
        id: comment.id,
        wordCount: comment.body.split(" ").length,
      })),
    [comments]
  );

  const data = {
    labels: commentWordCounts.map((comment) => `Comment #${comment.id}`),
    datasets: [
      {
        label: "Word Count",
        data: commentWordCounts.map((comment) => comment.wordCount),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="w-full h-40">
      <Bar data={data} options={{ maintainAspectRatio: false }} />
    </div>
  );
};

export default WordCountChart;
