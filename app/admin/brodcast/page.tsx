'use client';

import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { CldUploadButton } from 'next-cloudinary';
import { toast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Send } from 'lucide-react';
import sendMailAction from '@/actions/sendMail/send-mail';
import Link from 'next/link';

export default function BroadcastMail() {
  const [subject, setSubject] = useState('');
  const [msg, setMsg] = useState('');
  const [imageLink, setImageLink] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [link, setLink] = useState('');
  const [Heading1, setHeading1] = useState('');
  const [Heading2, setHeading2] = useState('');
  const [sending, setSending] = useState(false);

  async function handleSendMail(formData: FormData) {
    setSending(true);

    try {
      const response = await sendMailAction({
        subject: formData.get('subject') as string,
        msg: formData.get('msg') as string,
        imageLink: formData.get('imageLink') as string,
        couponCode: formData.get('couponCode') as string,
        link: formData.get('link') as string,
      });

      const jsonResponse = JSON.parse(response);
      if (jsonResponse.success) {
        toast({ title: jsonResponse.message });
        setSubject('');
        setMsg('');
        setImageLink('');
        setCouponCode('');
        setLink('');
      } else {
        toast({ title: jsonResponse.message || 'Error sending email.' });
      }
    } catch (error) {
      console.error('Error sending email:', error);
      alert('An unexpected error occurred.');
    } finally {
      setSending(false);
    }
  }

  const handleImageUpload = (result: any) => {
    const uploadedImageUrl = result?.info?.secure_url;
    if (uploadedImageUrl) {
      setImageLink(uploadedImageUrl);
    }
  };

  return (
    <div className="p-4 w-full">
      <h2 className="text-xl lg:font-2xl font-semibold">Send Broadcast Email</h2>

      <div className='flex flex-col lg:flex-row justify-between items-start gap-x-20'>
        {/* Form */}
        <form action={handleSendMail} className="space-y-4 w-full lg:w-1/2 mt-4">
          <Input
            type="text"
            name="heading1"
            placeholder="heading1"
            value={Heading1}
            onChange={(e) => setHeading1(e.target.value)}
            required
          />
          <Input
            type="text"
            name="heading2"
            placeholder="heading2"
            value={Heading2}
            onChange={(e) => setHeading2(e.target.value)}
            required
          />
          <Input
            type="text"
            name="subject"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
          <textarea
            name="msg"
            placeholder="Message"
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            className="border p-2 w-full h-32 rounded-lg"
            required
          />
          <Input
            type="text"
            name="couponCode"
            placeholder="Coupon Code (Optional)"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
          />
          <Input
            type="url"
            name="link"
            placeholder="Shop Link (Optional)"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
          <input type="hidden" name="imageLink" value={imageLink} />

          {/* Image Upload Button */}
          <CldUploadButton
            onSuccess={handleImageUpload}
            uploadPreset="mmmgkp-news"
            className="w-full h-40 border-2 border-dashed border-blue-500 flex flex-col items-center justify-center text-blue-500 text-center rounded-lg cursor-pointer hover:bg-blue-50 transition"
          >
            Upload Image
          </CldUploadButton>

          <div className='flex justify-start items-center gap-2 mb-6'>
            <Button
              type="submit"
              className={`py-5 w-fit px-6 rounded flex items-center gap-2 ${sending ? 'bg-gray-500 text-white' : 'bg-green-500 text-white'}`}
              disabled={sending}
            >
              {sending ? 'Sending...' : 'Send Mail'}
              <Send className="text-white" />
            </Button>
          </div>
        </form>

        {/* Mail Preview */}
        {(subject || msg || imageLink || couponCode || link || Heading1 || Heading2) && (
          <div className="max-w-2xl mx-auto border rounded-lg overflow-hidden shadow-lg">
            <div className="bg-black text-white p-4 text-left text-lg">Ready Set Grow</div>

            <div className="bg-pink-100 p-6 text-left">
              <h2 className="text-3xl font-bold mb-4">{Heading1 || "Get 25% off*"}<br /> {Heading2 || "Ends April 22, 2025"}</h2>
              {imageLink && <img src={imageLink} alt="Promo" className="w-full max-w-lg mx-auto my-4" />}
            </div>

            <div className="p-6 text-gray-800">
              <p>Hi there,</p>
              <p>{msg || "We have an exciting offer just for you!"}</p>

              {couponCode && (
                <div className="bg-gray-100 border border-gray-300 p-4 text-center font-bold text-lg my-4">
                  {couponCode}
                </div>
              )}

              <Link href={link || `${process.env.DOMAIN}/sales`} className="inline-block bg-black text-white px-6 py-3 rounded-md font-bold my-4">
                Start Shopping
              </Link>
            </div>

            <div className="bg-black text-white p-6 text-center">
              <div>{"Wonders Tapestry"}</div>
              <div>Terms for ice cream promotion.</div>

              <div className="flex justify-center space-x-4 mt-4">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                  <img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" alt="Facebook" className="w-6 h-6" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                  <img src="https://cdn-icons-png.flaticon.com/512/733/733579.png" alt="Twitter" className="w-6 h-6" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                  <img src="https://cdn-icons-png.flaticon.com/512/733/733558.png" alt="Instagram" className="w-6 h-6" />
                </a>
              </div>

              <div className="text-gray-400 text-sm mt-4">
                If you no longer wish to receive these emails, <a href="#" className="underline">unsubscribe here</a>.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
