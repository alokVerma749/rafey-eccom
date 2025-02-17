'use client';

import { useState } from 'react';
import { CldUploadButton } from 'next-cloudinary';
import sendMailAction from '@/actions/sendMail/send-mail';
import { toast } from '@/hooks/use-toast';
import Image from 'next/image';

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
        toast({title: jsonResponse.message,})
        // Clear form fields on success
        setSubject('');
        setMsg('');
        setImageLink('');
      } else {
        toast({title: jsonResponse.message || 'Error sending email.',})
      }
    } catch (error) {
      console.error('Error sending email:', error);
      alert('An unexpected error occurred.');
    }finally{
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
    <div className="p-4">
      <h2 className="text-xl font-bold">Send Broadcast Email</h2>

      {/* Form */}
      <form action={handleSendMail} className="space-y-4">
        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="border p-2 w-full"
          required
        />
        <textarea
          name="msg"
          placeholder="Message"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          className="border p-2 w-full"
          required
        />
        <input type="hidden" name="imageLink" value={imageLink} />

        {/* Image Upload Button */}
        <CldUploadButton
          onSuccess={handleImageUpload}
          uploadPreset="mmmgkp-news"
          className="bg-black p-2 text-white my-2 w-full rounded"
        >
          Upload Image
        </CldUploadButton>

        <button
          type="submit"
          className={`p-2 w-full rounded ${sending ? 'bg-gray-500' : 'bg-blue-500 text-white'}`}
          disabled={sending}
        >
          {sending ? 'Sending...' : 'Send Mail'}
        </button>
      </form>

      {/* Mail Preview */}
      {(subject || msg || imageLink) && (
        <div className="mt-6 p-4 border rounded">
          <h3 className="text-lg font-semibold">📩 Email Preview</h3>
          <p className="text-md font-bold">{subject || 'No Subject'}</p>
          <p className="text-sm">{msg || 'No message'}</p>
          {imageLink && <Image src={imageLink} alt="Preview" className="mt-2 w-full h-auto rounded-lg" />}
        </div>
      )}
    </div>
  );
}
