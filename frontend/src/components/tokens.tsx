

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Wallet } from "lucide-react";

import { useParams } from "react-router-dom";

const TokenPage = () => {
  
  const { total } = useParams()
  const tokens = total

  return (
    <div className="mt-5 flex justify-center gap-3">
      <Card className="max-w-sm bg-black text-white">
        <CardHeader>
          <CardTitle className="text-lg font-bold">Token Balance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mt-4">
            <span className="flex items-center">
              <Wallet className="mr-2 h-7 w-7" />
              Tokens: {tokens}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TokenPage;
