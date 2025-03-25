import CommonBannerSection from "@/components/shared/CommonBannerSection";
import Container from "@/components/shared/Container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Fragment } from "react";
import { IoIosSend } from "react-icons/io";

export default function Contact() {
  return (
    <Fragment>
      <CommonBannerSection title="Contact With Us" />
      <Container className="my-12 space-y-12">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-[#100E18]">
            Get in Touch with Us
          </h2>
          <p className="text-lg text-gray-800 mt-4">
            Have questions or need assistance? Our team is here to help! Feel
            free to reach out to us using the contact form or the details
            provided below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-[#100E18]">
              Send Us a Message
            </h3>
            <form className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-lg font-medium text-[#100E18]"
                >
                  Name
                </label>
                <Input
                  id="name"
                  placeholder="Your Name"
                  className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-lg font-medium text-[#100E18]"
                >
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Your Email"
                  className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-lg font-medium text-[#100E18]"
                >
                  Message
                </label>
                <Textarea
                  id="message"
                  placeholder="Your Message"
                  className="w-full h-48 p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div className="text-center">
                <Button
                  type="submit"
                  className="bg-[#F65D4E] hover:bg-[#D84C3F] text-white cursor-pointer"
                >
                  Send Message <IoIosSend className="text-2xl" />
                </Button>
              </div>
            </form>
          </div>

          {/* Contact Details */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-[#100E18]">
              Our Contact Information
            </h3>
            <div className="space-y-4">
              <div className="flex gap-4 items-center">
                <p className="font-semibold">Phone:</p>
                <p className="text-lg text-gray-800">+1 (555) 123-4567</p>
              </div>

              <div className="flex gap-4 items-center ">
                <p className="font-semibold">Email:</p>
                <p className="text-lg text-gray-800">support@bornobihar.com</p>
              </div>

              <div className="flex gap-4 items-center">
                <p className="font-semibold">Address:</p>
                <p className="text-lg text-gray-800">
                  1234 Book Street, Book Town, BornoBihar, Country
                </p>
              </div>
            </div>

            {/* Google Map */}
            <div className="w-full h-[300px] mt-6">
              <iframe
                className="w-full h-full rounded-lg"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387190.2799197545!2d-74.259865!3d40.6976701!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0:0x0!2zNDLCsDAxJzUwLjYiTiA3NMKwMTUnNTcuMyJX!5e0!3m2!1sen!2sus!4v1623893142217!5m2!1sen!2sus"
                allowFullScreen={true}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </Container>
    </Fragment>
  );
}
