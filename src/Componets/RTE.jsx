import React from 'react'
import { Editor } from '@tinymce/tinymce-react';
import { Controller } from 'react-hook-form';

export default function RTE({
    name, 
    control, 
    label, 
    defaultValue = "", 
    className = "",
    required = false
}) {
    return (
        <div className={`w-full ${className}`}> 
            {label && (
                <label 
                    className={`
                        inline-block 
                        mb-2 
                        pl-1 
                        text-sm 
                        font-medium 
                        text-gray-400
                        ${required ? 'after:content-["*"] after:ml-0.5 after:text-red-500' : ''}
                    `}
                >
                    {label}
                </label>
            )}

            <div className="rounded-lg overflow-hidden shadow-dark-glow transition-shadow duration-300 hover:shadow-dark-intense">
                <Controller
                    name={name || "content"}
                    control={control}
                    render={({field: {onChange}}) => (
                        <Editor
                            apiKey='w0nst3b1ddwbbj2nhl437rc3id4hg336atcb4cqm7t34moa2'
                            initialValue={defaultValue}
                            init={{
                                initialValue: defaultValue,
                                height: 500,
                                menubar: true,
                                skin: 'oxide-dark',
                                content_css: 'dark',
                                plugins: [
                                    "image",
                                    "advlist",
                                    "autolink",
                                    "lists",
                                    "link",
                                    "image",
                                    "charmap",
                                    "preview",
                                    "anchor",
                                    "searchreplace",
                                    "visualblocks",
                                    "code",
                                    "fullscreen",
                                    "insertdatetime",
                                    "media",
                                    "table",
                                    "code",
                                    "help",
                                    "wordcount",
                                    "anchor",
                                ],
                                toolbar:
                                "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
                                content_style: `
                                    body { 
                                        font-family: 'Inter', Helvetica, Arial, sans-serif; 
                                        font-size: 14px; 
                                        background-color: #1a1a1a !important; 
                                        color: #e0e0e0 !important;
                                    }
                                `,
                                // Custom styles for dark mode
                                formats: {
                                    alignleft: { selector: 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li', classes: 'text-left' },
                                    aligncenter: { selector: 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li', classes: 'text-center' },
                                    alignright: { selector: 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li', classes: 'text-right' },
                                    alignjustify: { selector: 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li', classes: 'text-justify' }
                                }
                            }}
                            onEditorChange={onChange}
                            // Add some custom classes for additional styling
                            className="dark-editor animate-subtle-entrance"
                        />
                    )}
                />
            </div>
        </div>
    )
}