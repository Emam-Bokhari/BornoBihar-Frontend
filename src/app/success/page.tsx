import { CheckCircle, BookOpen } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PaymentSuccessCard() {
  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-[500px] text-center shadow-lg p-6 rounded-2xl">
        <CardHeader>
          <div className="flex justify-center">
            <CheckCircle className="text-green-500" size={48} />
          </div>
          <CardTitle className="text-2xl font-bold mt-4">
            Payment Successful!
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">
            Thank you for your purchase. Your order has been confirmed.
          </p>
          <div className="flex justify-center mt-4">
            <BookOpen className="text-primary" size={42} />
          </div>
          <Link href="/" className="block">
            <Button
              className="mt-6 w-full bg-[#F65D4E] hover:bg-[#D84C3F] cursor-pointer text-white"
              variant="default"
            >
              Back to Home
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
