import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Headphones, ListChecks, MousePointerClick } from "lucide-react";
import React from "react";

export default function WhyUs() {


const features = [
  {
    title: "سهولة الاستخدام",
    description: "تطبيق بسيط وسهل الاستخدام يساعدك في إدارة مصاريفك.",
    icon: MousePointerClick,
  },
  {
    title: "تتبع المصاريف",
    description: "يمكنك تتبع مصاريفك اليومية بسهولة ويسر.",
    icon: ListChecks, 
  },
  {
    title: "دعم فني",
    description: "فريق دعم فني متاح لمساعدتك في أي وقت.",
    icon: Headphones,
  },
  {
    title: "تقارير مفصلة",
    description: "احصل على تقارير مفصلة عن مصاريفك وإيراداتك.",
    icon: BarChart3,
  },
];

  return (
    <section className="container section-gap">
      <h2 className="heading-color mx-auto w-fit text-2xl font-bold">
        لماذا نحن؟
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-4">
        {features.map(feature => (
          <Card key={feature.title}>
            <CardHeader>
              <feature.icon className="h-8 w-8 text-muted-foreground mx-auto" />
            </CardHeader>
            <CardContent className="text-center space-y-1">
              <CardTitle>{feature.title}</CardTitle>
              <CardDescription>{feature.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
