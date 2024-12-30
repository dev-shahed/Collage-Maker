import Replicate from 'replicate';

const replicate = new Replicate({
  auth: import.meta.env.VITE_REPLICATE_API_TOKEN, // Ensure this matches your environment setup.
});

export const applyAIEffect = async (imageUrl: string, effectId: string) => {
  try {
    switch (effectId) {
      case 'enhance':
        return await replicate.run(
          "nightmareai/real-esrgan:42fed1c4974146d4d2414e2be2c5277c7fcf05fcc3a73abf41610695738c1d7b",
          { input: { image: imageUrl } }
        );
      case 'style-transfer':
        return await replicate.run(
          "rossjillian/controlnet:795433b19458d0f4fa172a7ccf93178d2adb1cb8ae647a6e91bf1336d4f0ac10",
          { input: { image: imageUrl } }
        );
      case 'portrait':
        return await replicate.run(
          "tencentarc/gfpgan:9283608cc6b7be6b65a8e44983db012355fde4132009bf99d976b2f0896856a3",
          { input: { image: imageUrl } } // Ensure the input matches the model's requirements.
        );
      default:
        throw new Error(`Unknown effect: ${effectId}`);
    }
  } catch (error) {
    console.error(`Error applying AI effect (${effectId}):`, error);
    throw new Error(`Failed to apply AI effect: ${error.message}`);
  }
};