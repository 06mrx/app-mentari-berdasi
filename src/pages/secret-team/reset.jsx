import { useRouter } from "next/router";
import { storageService } from "@/services/storage.service";
export default function Reset() {
    let router = useRouter();
    if(router.isReady) {
        storageService.add('secret', 'false');
        router.push('/')
    }
    return <>
    
    </>
}