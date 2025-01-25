import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { TabCard } from "./TabCard";
import { Product } from "@/types/product_type";

export function TabArea({ cardDetail }: { cardDetail: Product[] }) {
  console.log(cardDetail, "Card")
  return (
    <ResizablePanelGroup direction="horizontal" className="max-w-full rounded-lg">
      <ResizablePanel defaultSize={50}>
        <ResizablePanelGroup direction="vertical">
          <ResizablePanel defaultSize={50}>
            <ResizablePanelGroup direction="horizontal">
              <ResizablePanel defaultSize={50}>
                <TabCard cardDetail={cardDetail[0]} />
              </ResizablePanel>
              <ResizableHandle />
              <ResizablePanel defaultSize={50}>
                <TabCard cardDetail={cardDetail[1]} />

              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>

          <ResizableHandle />

          <ResizablePanel defaultSize={50}>
            <TabCard cardDetail={cardDetail[2]} />
          </ResizablePanel>

        </ResizablePanelGroup>
      </ResizablePanel>
      <ResizableHandle />

      <ResizablePanel defaultSize={50}>
        <TabCard cardDetail={cardDetail[3]} />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
