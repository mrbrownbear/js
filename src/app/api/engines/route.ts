import openai from "@/src/lib/chatgpt";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const response = await openai.models.list();
    // Filter only text-based models (adjust the condition to your needs)
    const filteredModels = response.data.filter((model) => {
      // Here, I'm filtering for any model with 'text-' prefix in the ID.
      // You can also combine multiple conditions, for example:
      //  (model.id.includes("text-davinci") || model.id.includes("gpt-3.5-turbo"))
      return (
        (model.id.includes('gpt-3.5-turbo') || model.id.includes('gpt-4')) &&
        !model.id.includes('audio') &&
        !model.id.includes('mini') &&
        !model.id.includes('realtime') &&
        !model.id.includes('o-') // exclude gpt-4o or any variation
      );
    });

    const modelOptions = filteredModels.map((model) => ({
      value: model.id,
      label: model.id,
    }));

    return NextResponse.json(
      {
        success: true,
        modelOptions,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error,
      },
      { status: 500 }
    );
  }
};
