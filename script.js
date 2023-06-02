import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

import java.io.IOException;

public class OpenAIChatExample {
    public static void main(String[] args) {
        OkHttpClient client = new OkHttpClient();
        MediaType mediaType = MediaType.parse("application/json");

        String apiKey = "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"; // Reemplaza con tu clave de API

        String prompt = "Who won the World Series in 2020?";

        String json = String.format("{\"prompt\": \"%s\", \"max_tokens\": 50, \"temperature\": 0.7}", prompt);

        RequestBody requestBody = RequestBody.create(json, mediaType);
        Request request = new Request.Builder()
                .url("https://api.openai.com/v1/engines/davinci-codex/completions")
                .post(requestBody)
                .addHeader("Content-Type", "application/json")
                .addHeader("Authorization", "Bearer " + apiKey)
                .build();

        try {
            Response response = client.newCall(request).execute();
            if (response.isSuccessful()) {
                String responseBody = response.body().string();
                System.out.println(responseBody);
                // Procesa la respuesta como desees
            } else {
                System.out.println("Error: " + response.code() + " " + response.message());
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
