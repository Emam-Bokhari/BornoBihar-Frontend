import { XCircle, BookOpen } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PaymentCancelCard() {
  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-[500px] text-center shadow-lg p-6 rounded-2xl">
        <CardHeader>
          <div className="flex justify-center">
            <XCircle className="text-red-500" size={48} />
          </div>
          <CardTitle className="text-2xl font-bold mt-4">
            Payment Failed!
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">
            Your payment could not be processed. Please try again.
          </p>
          <div className="flex justify-center mt-4">
            <BookOpen className="text-primary" size={42} />
          </div>
          <Link href="/books" className="block">
            <Button
              className="mt-6 w-full bg-[#F65D4E] hover:bg-[#D84C3F] cursor-pointer text-white"
              variant="default"
            >
              Try Again
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
