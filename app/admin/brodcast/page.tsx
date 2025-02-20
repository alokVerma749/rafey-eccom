'use client';

import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { CldUploadButton } from 'next-cloudinary';
import sendMailAction from '@/actions/sendMail/send-mail';
import { toast } from '@/hooks/use-toast';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Send } from 'lucide-react';

export default function BroadcastMail() {
  const [subject, setSubject] = useState('');
  const [msg, setMsg] = useState('');
  const [imageLink, setImageLink] = useState('');
  const [sending, setSending] = useState(false);

  async function handleSendMail(formData: FormData) {
    setSending(true);

    try {
      const response = await sendMailAction({
        subject: formData.get('subject') as string,
        msg: formData.get('msg') as string,
        imageLink: formData.get('imageLink') as string,
      });

      const jsonResponse = JSON.parse(response);

      if (jsonResponse.success) {
        toast({ title: jsonResponse.message, })
        // Clear form fields on success
        setSubject('');
        setMsg('');
        setImageLink('');
      } else {
        toast({ title: jsonResponse.message || 'Error sending email.', })
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
            name="subject"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className='w-full p-2 bor'
            required
          />
          <textarea
            name="msg"
            placeholder="Message"
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            className="border p-2 w-full h-32"
            required
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
              className={`py-5 w-fit px-6 rounded flex items-center gap-2 ${sending ? 'bg-gray-500 text-white' : 'bg-green-500 text-white'
                }`}
              disabled={sending}
            >
              {sending ? 'Sending...' : 'Send Mail'}
              <Send className={sending ? 'text-white' : 'text-white'} />
            </Button>
          </div>

        </form>

        {/* Mail Preview */}
        {(subject || msg || imageLink) && (
          <div className="p-4 border rounded w-full lg:w-1/2 mt-4">
            <h3 className="text-lg font-semibold">📩 Email Preview</h3>
            <p className="text-md font-bold">{subject || 'No Subject'}</p>
            <p className="text-sm">{msg || 'No message'}</p>
            {imageLink && <Image src={imageLink} alt="Preview" className="mt-2 w-full h-auto rounded-lg" height={800} width={800} />}
          </div>
        )}
      </div>
    </div>
  );
}
