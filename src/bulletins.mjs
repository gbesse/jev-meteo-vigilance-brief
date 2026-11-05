export function selectBulletinsAt(bulletins,asOf){
 const fail=()=>{throw new TypeError('FR: Bulletin daté invalide. / EN: Invalid dated bulletin. / ES: Boletín fechado inválido.');};
 const stamp=x=>{if(typeof x!=='string'||!/^\d{4}-\d{2}-\d{2}T.*(?:Z|[+-]\d{2}:\d{2})$/.test(x)||!Number.isFinite(Date.parse(x)))fail();return Date.parse(x);};
 const at=stamp(asOf);if(!Array.isArray(bulletins)||bulletins.length>1000)fail();const groups=new Map();
 for(const b of bulletins){const issued=stamp(b.issuedAt),from=stamp(b.validFrom),to=stamp(b.validUntil);if(from>=to||typeof b.area!=='string'||!b.area||!Array.isArray(b.hazards))fail();if(issued>at||at<from||at>=to)continue;const current=groups.get(b.area);if(!current||issued>current.issued)groups.set(b.area,{issued,bulletin:structuredClone(b)});else if(issued===current.issued&&JSON.stringify(b)!==JSON.stringify(current.bulletin))fail();}
 return {asOf,areas:[...groups.values()].map(x=>x.bulletin),absenceMeansNoHazard:false};
}
