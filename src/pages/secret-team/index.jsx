import { useRouter } from "next/router";
import { storageService } from "@/services/storage.service";
export default function Index() {
    let router = useRouter();
    if(router.isReady) {
        storageService.add('secret', 'true');
        router.push('/')
    }
    return <>
    
    </>
}