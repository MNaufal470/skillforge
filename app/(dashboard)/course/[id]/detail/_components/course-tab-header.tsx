import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Chapters from "../../_components/chapters";
import Preview from "@/components/preview-quill";
import ChapterAttachments from "./chapter-attachments";
import Reviews from "../../_components/reviews";
import { courseDetail } from "@/action/get-course";

const CourseTabHeader = ({ course }: { course: courseDetail }) => {
  let lorem =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut placeat quibusdam eaque a necessitatibus architecto odio vel in laudantium nihil, iure officia eius qui adipisci nulla tenetur ut rem saepe dicta! Provident blanditiis exercitationem ea adipisci animi repellendus accusantium inventore esse error corporis, iure minus corrupti, excepturi tenetur eaque distinctio sequi quidem quia optio facere ipsum quis ab. Error, corporis enim? Impedit facilis excepturi sit minima rem perspiciatis consectetur iusto nobis soluta expedita accusantium dicta blanditiis rerum iure cumque ab consequuntur inventore provident, ipsam repellat ratione. Nobis quaerat odit quam placeat dolores officiis molestiae eum illo. Perferendis, impedit labore.";
  return (
    <Tabs defaultValue="account" className="w-full  px-5">
      <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-4 h-28 md:h-auto">
        <TabsTrigger value="account" className="h-10 md:h-auto">
          Course Content
        </TabsTrigger>
        <TabsTrigger value="description" className="h-10 md:h-auto">
          Overview
        </TabsTrigger>
        <TabsTrigger value="att" className="h-10 md:h-auto">
          Attachments
        </TabsTrigger>
        <TabsTrigger value="review" className="h-10 md:h-auto">
          Reviews
        </TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Card>
          <CardContent>
            <Chapters section={course.section} />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="description">
        <Card>
          <CardHeader>
            <CardTitle>About this chapter</CardTitle>
            <CardDescription>Introduction chapter</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Preview value={lorem} />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="att">
        <Card>
          <CardHeader>
            <CardTitle>Attachments of this chapter</CardTitle>
            <CardDescription>Introduction chapter</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <ChapterAttachments />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="review">
        <Card>
          <CardContent className="space-y-2 px-10 pt-6">
            <Reviews />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default CourseTabHeader;
