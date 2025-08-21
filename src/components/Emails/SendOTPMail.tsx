import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

interface SendOTPMailProps {
  validationCode?: string;
}

export default function SendOTPMail({
  validationCode = "123123",
}: SendOTPMailProps) {
  return (
    <Html>
      <Head>
        <title>فلوسي | تحقق من بريدك الإلكتروني</title>
      </Head>
      <Tailwind>
        <Body className="bg-gray-100 font-sans my-8 md:my-16">
          <Container>
            <Section className="max-w-lg mx-auto bg-white rounded-lg shadow-lg p-6">
              <div className="flex justify-center items-center mb-4 mx-auto">
                <Img
                  src="https://media.discordapp.net/attachments/1397994186950574130/1403791674840317993/logo.jpg?ex=68997f20&is=68982da0&hm=c016e1daa8b3eb59e7c4872f27122c8881256a74da06638259715c1c2c198a96&=&format=webp"
                  alt="Floosy"
                  width={80}
                  height={80}
                  className="rounded-full border border-gray-300 content-center mx-auto"
                />
              </div>

              <Heading className="text-center text-2xl font-bold text-blue-600">
                أهلاً بك في <span className="text-yellow-500">فلوسي</span>!
              </Heading>

              <Text className="text-center text-gray-700 mt-2">
                شكرًا لانضمامك إلينا 🤝 لتفعيل حسابك، برجاء إدخال كود التحقق
                المكون من 6 أرقام في التطبيق.
              </Text>

              <div className="flex justify-center items-center text-center gap-2 mt-6">
                {validationCode?.split("").map((digit, index) => (
                  <Text
                    key={index}
                    className="text-2xl  font-bold border-2 border-blue-500 text-blue-700 p-3 rounded-lg min-w-[40px] text-center mx-auto"
                  >
                    {digit}
                  </Text>
                ))}
              </div>

              <div className="text-center mt-4">
                <button
                  className="bg-blue-500 transition-all text-white px-4 py-2 rounded-lg cursor-pointer"
                  onClick={() => navigator.clipboard.writeText(validationCode)}
                >
                  نسخ الكود 📋
                </button>
              </div>

              <Text className="text-center text-sm text-gray-500 mt-6">
                إذا لم تكن أنت من طلب التسجيل، يمكنك تجاهل هذه الرسالة.
              </Text>
              <Text className="text-center text-sm text-gray-500 mt-6">
                هذا الكود يعمل حتي يتم تفعيل الحساب.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
